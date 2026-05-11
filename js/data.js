// ═══ Default site data ═══
// 🔧 ШАБЛОН: замените тексты, контакты, фото и имена педагогов на свои.
const DEFAULT = {
  settings: {
    siteName: "Нур-Малика",
    siteTaglineRu: "Тёплый дом для каждого ребёнка",
    siteTaglineKz: "Әр балаға арналған жылы үй",
    phone: "+7 (700) 123 45 67",
    email: "info@example.kz",
    address: "Актюбинская обл., Мугалжарский р-н, г. Эмба, ул. Геолог, 7",
    addressKz: "Ақтөбе обл., Мұғалжар ауданы, Ембі қаласы, Геолог көшесі, 7",
    instagram: "@your_kindergarten",
    hours: "Пн–Пт: 8:00 – 18:00",
    hoursKz: "Дс–Жм: 8:00 – 18:00",
    notifyEmail: "",
    formspreeUrl: "",
    adminPassword: "admin123",
    aboutImage: "",
    heroImage: "",
    heroStat1: "10", heroStat1Ru: "лет работы", heroStat1Kz: "жыл жұмыс",
    heroStat2: "100", heroStat2Ru: "детей", heroStat2Kz: "бала",
    heroStat3: "12", heroStat3Ru: "педагогов", heroStat3Kz: "педагог",
  },
  about: {
    titleRu: "О нашем детском саде",
    titleKz: "Біздің балабақша туралы",
    textRu: "Здесь будет краткий рассказ о вашем детском саде. Расскажите о ценностях, подходе к воспитанию и атмосфере. Этот текст легко заменить через админ-панель или прямо в файле js/data.js.",
    textKz: "Мұнда сіздің балабақшаңыз туралы қысқаша әңгіме болады. Құндылықтар, тәрбиелеу тәсілі және атмосфера туралы айтыңыз. Бұл мәтінді әкімші панелі арқылы немесе тікелей js/data.js файлында ауыстыруға болады.",
    missionRu: "Наша миссия — здесь укажите краткое описание миссии детского сада: какие ценности вы прививаете и к чему готовите детей.",
    missionKz: "Біздің миссиямыз — мұнда балабақшаның миссиясын қысқаша сипаттаңыз: қандай құндылықтарды сіңіресіз және балаларды неге дайындайсыз.",
    groups: [
      { nameRu: "Группа «Солнышко»", nameKz: "«Күншуақ» тобы", ageRu: "5–6 лет", ageKz: "5–6 жас", icon: "☀️", image: "" },
      { nameRu: "Группа «Звёздочка»", nameKz: "«Жұлдызша» тобы", ageRu: "4–5 лет", ageKz: "4–5 жас", icon: "⭐", image: "" },
      { nameRu: "Группа «Радуга»",   nameKz: "«Кемпірқосақ» тобы", ageRu: "3–4 года", ageKz: "3–4 жас", icon: "🌈", image: "" }
    ]
  },
  news: [
    { id: 1, titleRu: "Заголовок новости №1", titleKz: "№1 жаңалық тақырыбы", date: "2026-02-10",
      textRu: "Краткое описание первого события. Замените этот текст на свою новость: что произошло, кто участвовал, как это было.",
      textKz: "Бірінші оқиғаның қысқаша сипаттамасы. Бұл мәтінді өз жаңалығыңызбен ауыстырыңыз: не болды, кім қатысты, қалай өтті.",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80" },
    { id: 2, titleRu: "Заголовок новости №2", titleKz: "№2 жаңалық тақырыбы", date: "2026-03-05",
      textRu: "Краткое описание второго события. Здесь можно рассказать о праздниках, занятиях, открытых уроках и других событиях детского сада.",
      textKz: "Екінші оқиғаның қысқаша сипаттамасы. Мұнда мерекелер, сабақтар, ашық сабақтар және басқа да оқиғалар туралы әңгіме қозғауға болады.",
      image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80" },
    { id: 3, titleRu: "Заголовок новости №3", titleKz: "№3 жаңалық тақырыбы", date: "2026-03-21",
      textRu: "Краткое описание третьего события. Добавляйте свои новости через админ-панель — они автоматически появятся на главной странице.",
      textKz: "Үшінші оқиғаның қысқаша сипаттамасы. Әкімші панелі арқылы өз жаңалықтарыңызды қосыңыз — олар басты бетте автоматты түрде пайда болады.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80" }
  ],
  team: [
    { id: 1, nameRu: "Иванова Анна Петровна", nameKz: "Иванова Анна Петровна", roleRu: "Директор", roleKz: "Директор",
      bioRu: "Краткая биография педагога: образование, опыт работы, специализация. Замените на реальные данные.",
      bioKz: "Педагогтың қысқаша өмірбаяны: білімі, жұмыс тәжірибесі, мамандануы. Нақты деректермен ауыстырыңыз.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
    { id: 2, nameRu: "Петрова Мария Сергеевна", nameKz: "Петрова Мария Сергеевна", roleRu: "Заведующая", roleKz: "Меңгеруші",
      bioRu: "Краткая биография педагога: образование, опыт работы, специализация. Замените на реальные данные.",
      bioKz: "Педагогтың қысқаша өмірбаяны: білімі, жұмыс тәжірибесі, мамандануы. Нақты деректермен ауыстырыңыз.",
      photo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&q=80" },
    { id: 3, nameRu: "Сидорова Елена Ивановна", nameKz: "Сидорова Елена Ивановна", roleRu: "Воспитатель", roleKz: "Тәрбиеші",
      bioRu: "Краткая биография педагога: образование, опыт работы, специализация. Замените на реальные данные.",
      bioKz: "Педагогтың қысқаша өмірбаяны: білімі, жұмыс тәжірибесі, мамандануы. Нақты деректермен ауыстырыңыз.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" },
    { id: 4, nameRu: "Кузнецова Ольга Викторовна", nameKz: "Кузнецова Ольга Викторовна", roleRu: "Воспитатель", roleKz: "Тәрбиеші",
      bioRu: "Краткая биография педагога: образование, опыт работы, специализация. Замените на реальные данные.",
      bioKz: "Педагогтың қысқаша өмірбаяны: білімі, жұмыс тәжірибесі, мамандануы. Нақты деректермен ауыстырыңыз.",
      photo: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&q=80" },
    { id: 5, nameRu: "Морозова Татьяна Александровна", nameKz: "Морозова Татьяна Александровна", roleRu: "Воспитатель", roleKz: "Тәрбиеші",
      bioRu: "Краткая биография педагога: образование, опыт работы, специализация. Замените на реальные данные.",
      bioKz: "Педагогтың қысқаша өмірбаяны: білімі, жұмыс тәжірибесі, мамандануы. Нақты деректермен ауыстырыңыз.",
      photo: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=500&q=80" }
  ],
  gallery: [
    { id: 1, url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80", captionRu: "Фото 1", captionKz: "1-сурет", category: "Праздники" },
    { id: 2, url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80", captionRu: "Фото 2", captionKz: "2-сурет", category: "Занятия" },
    { id: 3, url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80", captionRu: "Фото 3", captionKz: "3-сурет", category: "Прогулки" },
    { id: 4, url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80", captionRu: "Фото 4", captionKz: "4-сурет", category: "Занятия" },
    { id: 5, url: "https://images.unsplash.com/photo-1567951046718-e2d0b2f42bd9?w=800&q=80", captionRu: "Фото 5", captionKz: "5-сурет", category: "Занятия" },
    { id: 6, url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", captionRu: "Фото 6", captionKz: "6-сурет", category: "Прогулки" },
    { id: 7, url: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=80", captionRu: "Фото 7", captionKz: "7-сурет", category: "Занятия" },
    { id: 8, url: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&q=80", captionRu: "Фото 8", captionKz: "8-сурет", category: "Интерьер" },
    { id: 9, url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80", captionRu: "Фото 9", captionKz: "9-сурет", category: "Прогулки" }
  ],
  programs: [
    { id: 1, icon: "📚", titleRu: "Программа 1", titleKz: "1-бағдарлама",
      descRu: "Краткое описание первой программы. Расскажите о её содержании, целях и результатах для детей.",
      descKz: "Бірінші бағдарламаның қысқаша сипаттамасы. Оның мазмұны, мақсаттары және балаларға арналған нәтижелері туралы айтыңыз." },
    { id: 2, icon: "🎨", titleRu: "Программа 2", titleKz: "2-бағдарлама",
      descRu: "Краткое описание второй программы. Например: творческое развитие, рисование, лепка, музыка.",
      descKz: "Екінші бағдарламаның қысқаша сипаттамасы. Мысалы: шығармашылық даму, сурет салу, мүсіндеу, музыка." },
    { id: 3, icon: "🍎", titleRu: "Программа 3", titleKz: "3-бағдарлама",
      descRu: "Краткое описание третьей программы. Например: здоровое питание, физическое развитие, закаливание.",
      descKz: "Үшінші бағдарламаның қысқаша сипаттамасы. Мысалы: дұрыс тамақтану, дене дамуы, шынықтыру." },
    { id: 4, icon: "✏️", titleRu: "Программа 4", titleKz: "4-бағдарлама",
      descRu: "Краткое описание четвёртой программы. Например: подготовка к школе, чтение, письмо, счёт.",
      descKz: "Төртінші бағдарламаның қысқаша сипаттамасы. Мысалы: мектепке дайындық, оқу, жазу, санау." }
  ],
  submissions: [],
  attestation: [
    { id: 1, icon: "📋", titleRu: "Лицензия на образовательную деятельность", titleKz: "Білім беру қызметіне лицензия",
      descRu: "Здесь укажите данные лицензии: серию, номер, орган выдачи. Замените на реальные данные.",
      descKz: "Мұнда лицензияның деректерін көрсетіңіз: сериясы, нөмірі, берген органы. Нақты деректермен ауыстырыңыз.", date: "2024-01-01", type: "license", year: "2024-2025", fileId: null, fileUrl: null, fileName: null, fileType: null },
    { id: 2, icon: "🏆", titleRu: "Сертификат соответствия", titleKz: "Сәйкестік сертификаты",
      descRu: "Краткое описание документа. Загрузите PDF-файл через админ-панель.",
      descKz: "Құжаттың қысқаша сипаттамасы. PDF файлды әкімші панелі арқылы жүктеңіз.", date: "2024-02-01", type: "cert", year: "2024-2025", fileId: null, fileUrl: null, fileName: null, fileType: null },
    { id: 3, icon: "👩‍🏫", titleRu: "Аттестат директора", titleKz: "Директор аттестаты",
      descRu: "Краткое описание документа. Замените на реальные данные.",
      descKz: "Құжаттың қысқаша сипаттамасы. Нақты деректермен ауыстырыңыз.", date: "2023-06-01", type: "att", year: "2023-2024", fileId: null, fileUrl: null, fileName: null, fileType: null },
    { id: 4, icon: "🏥", titleRu: "Санитарно-эпидемиологическое заключение", titleKz: "Санитарлық-эпидемиологиялық қорытынды",
      descRu: "Краткое описание документа. Замените на реальные данные.",
      descKz: "Құжаттың қысқаша сипаттамасы. Нақты деректермен ауыстырыңыз.", date: "2024-03-01", type: "san", year: "2024-2025", fileId: null, fileUrl: null, fileName: null, fileType: null }
  ]
};

// ═══ Storage layer ═══
// Гибридный: пробуем сервер (api.php). Если не отвечает → fallback на localStorage.

const STORAGE_KEY = 'sadikData';
const API_URL     = 'api.php';

let _cache       = null;   // последняя загруженная/сохранённая копия данных
let _serverMode  = false;  // true если сервер ответил при initData()

function _merge(d) {
  d = d || {};
  return {
    settings:    { ...DEFAULT.settings,    ...(d.settings    || {}) },
    about:       { ...DEFAULT.about,       ...(d.about       || {}), groups: (d.about && d.about.groups) ? d.about.groups : DEFAULT.about.groups },
    news:        d.news        || DEFAULT.news,
    team:        d.team        || DEFAULT.team,
    gallery:     d.gallery     || DEFAULT.gallery,
    programs:    d.programs    || DEFAULT.programs,
    submissions: d.submissions || [],
    attestation: d.attestation || DEFAULT.attestation
  };
}

/** Загружает данные с сервера. При неудаче — из localStorage. Должна вызываться 1 раз при загрузке страницы. */
async function initData() {
  // 1) Пробуем сервер
  try {
    const r = await fetch(API_URL + '?action=load', { cache: 'no-store' });
    if (r.ok) {
      const j = await r.json();
      if (j && typeof j === 'object' && !j.error) {
        _cache = _merge(j);
        _serverMode = true;
        return;
      }
    }
  } catch (e) {
    // сервер недоступен (file://, нет PHP, оффлайн) — идём в локальный режим
  }
  // 2) Fallback: localStorage
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    _cache = s ? _merge(JSON.parse(s)) : JSON.parse(JSON.stringify(DEFAULT));
  } catch {
    _cache = JSON.parse(JSON.stringify(DEFAULT));
  }
}

/** Возвращает копию текущих данных. Синхронно — берёт из кеша. */
function getData() {
  if (!_cache) return JSON.parse(JSON.stringify(DEFAULT));
  return JSON.parse(JSON.stringify(_cache));
}

/** Был ли установлен серверный режим при initData(). */
function isServerMode() { return _serverMode; }

/** Сохраняет данные. На сервере требует пароль из sessionStorage. */
async function saveData(d) {
  _cache = _merge(d);

  if (_serverMode) {
    try {
      const password = sessionStorage.getItem('adminPassword') || '';
      const r = await fetch(API_URL + '?action=save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify(d)
      });
      if (r.status === 401) {
        if (typeof toast === 'function') toast('⚠️ Сессия истекла. Войдите заново.', 'error');
        sessionStorage.removeItem('adminPassword');
        if (typeof doLogout === 'function') doLogout();
        return false;
      }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return true;
    } catch (e) {
      if (typeof toast === 'function') toast('⚠️ Не удалось сохранить на сервер: ' + (e.message || e), 'error');
      return false;
    }
  }

  // Локальный режим
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    return true;
  } catch (e) {
    const isQuota = e && (e.name === 'QuotaExceededError' || e.code === 22 || /quota/i.test(e.message || ''));
    const msg = isQuota
      ? '⚠️ Браузер переполнен! Удалите старые фото или используйте ссылки (URL) вместо загрузки с компьютера.'
      : '⚠️ Не удалось сохранить: ' + (e.message || e);
    if (typeof toast === 'function') toast(msg, 'error');
    else alert(msg);
    return false;
  }
}

/** Сброс к дефолтным данным. */
async function resetData() {
  if (_serverMode) {
    try {
      const password = sessionStorage.getItem('adminPassword') || '';
      await fetch(API_URL + '?action=reset', {
        method: 'POST',
        headers: { 'X-Admin-Password': password }
      });
    } catch {}
    _cache = JSON.parse(JSON.stringify(DEFAULT));
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  _cache = JSON.parse(JSON.stringify(DEFAULT));
}

/** Загрузить файл (изображение/PDF) на сервер. Возвращает {url, name, type, size} или null. */
async function uploadFileToServer(file) {
  if (!_serverMode) return null;
  const form = new FormData();
  form.append('file', file);
  const password = sessionStorage.getItem('adminPassword') || '';
  const r = await fetch(API_URL + '?action=upload', {
    method: 'POST',
    headers: { 'X-Admin-Password': password },
    body: form
  });
  if (!r.ok) {
    let err = 'Upload failed';
    try { const j = await r.json(); if (j.error) err = j.error; } catch {}
    throw new Error(err);
  }
  return await r.json();
}

/** Отправить заявку с публичной формы (без авторизации). Возвращает true/false. */
async function submitContactForm(submission) {
  if (!_serverMode) return false;
  try {
    const r = await fetch(API_URL + '?action=submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });
    return r.ok;
  } catch {
    return false;
  }
}
