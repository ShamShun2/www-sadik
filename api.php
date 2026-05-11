<?php
/**
 * api.php — серверный бэкенд для сайта детского сада «Нур-Малика»
 *
 * Действия (передаются через ?action=...):
 *   load            — GET. Загружает все данные сайта (без хеша пароля).
 *   save            — POST. Сохраняет данные. Требует X-Admin-Password.
 *   login           — POST. Проверяет пароль, возвращает {ok:bool}.
 *   changePassword  — POST. Меняет пароль. Требует X-Admin-Password.
 *   upload          — POST multipart. Загружает файл. Требует X-Admin-Password.
 *   submit          — POST. Принимает заявку с формы (без авторизации).
 *   reset           — POST. Сброс данных. Требует X-Admin-Password.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

$BASE      = __DIR__;
$DATA_FILE = $BASE . '/data.json';
$UPLOADS   = $BASE . '/uploads';

if (!is_dir($UPLOADS)) {
    @mkdir($UPLOADS, 0755, true);
}

/** Создаёт data.json при первом запросе с дефолтным паролем admin123. */
function ensureData(): array {
    global $DATA_FILE;
    if (!file_exists($DATA_FILE)) {
        $seed = [
            'settings' => [
                'adminPasswordHash' => password_hash('admin123', PASSWORD_DEFAULT)
            ]
        ];
        file_put_contents(
            $DATA_FILE,
            json_encode($seed, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT),
            LOCK_EX
        );
    }
    $raw = @file_get_contents($DATA_FILE);
    $arr = json_decode($raw ?: '{}', true);
    return is_array($arr) ? $arr : [];
}

function writeData(array $d): void {
    global $DATA_FILE;
    file_put_contents(
        $DATA_FILE,
        json_encode($d, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT),
        LOCK_EX
    );
}

function requireAuth(): void {
    $pw   = $_SERVER['HTTP_X_ADMIN_PASSWORD'] ?? '';
    $d    = ensureData();
    $hash = $d['settings']['adminPasswordHash'] ?? '';
    if (!$hash || !password_verify($pw, $hash)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

function readJsonBody(): array {
    $raw = @file_get_contents('php://input') ?: '';
    $j   = json_decode($raw, true);
    return is_array($j) ? $j : [];
}

$action = $_GET['action'] ?? '';

try {
    switch ($action) {

        case 'load': {
            $d = ensureData();
            unset($d['settings']['adminPasswordHash']);
            echo json_encode($d, JSON_UNESCAPED_UNICODE);
            break;
        }

        case 'save': {
            requireAuth();
            $body = readJsonBody();
            if (!$body || !isset($body['settings'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Bad JSON']);
                exit;
            }
            $existing = ensureData();
            // Пароль никогда не приходит с клиента — сохраняем существующий.
            $body['settings']['adminPasswordHash'] = $existing['settings']['adminPasswordHash'] ?? '';
            writeData($body);
            echo json_encode(['ok' => true]);
            break;
        }

        case 'login': {
            $body = readJsonBody();
            $pw   = (string)($body['password'] ?? '');
            $d    = ensureData();
            $hash = $d['settings']['adminPasswordHash'] ?? '';
            $ok   = $hash && password_verify($pw, $hash);
            echo json_encode(['ok' => (bool)$ok]);
            break;
        }

        case 'changePassword': {
            requireAuth();
            $body = readJsonBody();
            $new  = (string)($body['newPassword'] ?? '');
            if (strlen($new) < 4) {
                http_response_code(400);
                echo json_encode(['error' => 'Password too short']);
                exit;
            }
            $d = ensureData();
            $d['settings']['adminPasswordHash'] = password_hash($new, PASSWORD_DEFAULT);
            writeData($d);
            echo json_encode(['ok' => true]);
            break;
        }

        case 'upload': {
            requireAuth();
            global $UPLOADS;
            if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
                http_response_code(400);
                echo json_encode(['error' => 'No file or upload error']);
                exit;
            }
            $f       = $_FILES['file'];
            $maxSize = 15 * 1024 * 1024; // 15 MB
            if ($f['size'] > $maxSize) {
                http_response_code(413);
                echo json_encode(['error' => 'File too large (max 15 MB)']);
                exit;
            }
            $allowed = ['png','jpg','jpeg','gif','webp','svg','pdf'];
            $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
            if (!in_array($ext, $allowed, true)) {
                http_response_code(415);
                echo json_encode(['error' => 'Unsupported file type']);
                exit;
            }
            $id   = bin2hex(random_bytes(8));
            $name = $id . '.' . $ext;
            if (!move_uploaded_file($f['tmp_name'], $UPLOADS . '/' . $name)) {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to save file']);
                exit;
            }
            echo json_encode([
                'ok'   => true,
                'id'   => $id,
                'url'  => 'uploads/' . $name,
                'name' => $f['name'],
                'type' => $f['type'] ?? '',
                'size' => $f['size']
            ]);
            break;
        }

        case 'submit': {
            $body  = readJsonBody();
            $name  = trim((string)($body['name'] ?? ''));
            $phone = trim((string)($body['phone'] ?? ''));
            if ($name === '' || $phone === '') {
                http_response_code(400);
                echo json_encode(['error' => 'name and phone required']);
                exit;
            }
            $d = ensureData();
            $d['submissions'] = $d['submissions'] ?? [];
            array_unshift($d['submissions'], [
                'id'      => (int)(microtime(true) * 1000),
                'name'    => $name,
                'phone'   => $phone,
                'message' => (string)($body['message'] ?? ''),
                'date'    => date('c'),
                'page'    => (string)($body['page'] ?? '')
            ]);
            // Храним последние 500 заявок, чтобы файл не разрастался бесконечно.
            $d['submissions'] = array_slice($d['submissions'], 0, 500);
            writeData($d);
            echo json_encode(['ok' => true]);
            break;
        }

        case 'reset': {
            requireAuth();
            $d    = ensureData();
            $hash = $d['settings']['adminPasswordHash'] ?? '';
            // Сохраняем только пароль — всё остальное обнуляется (фронт подмержит DEFAULT).
            writeData(['settings' => ['adminPasswordHash' => $hash]]);
            echo json_encode(['ok' => true]);
            break;
        }

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Unknown action']);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
