/* ═══ Language & Shared functionality ═══ */

let LANG = localStorage.getItem('sadikLang') || 'kz';

function t(ru, kz) { return LANG === 'kz' ? (kz || ru) : ru; }

function setLang(lang) {
  LANG = lang;
  localStorage.setItem('sadikLang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  // re-render if render() exists
  if (typeof render === 'function') render();
}

function initHeader() {
  // scrolled shadow
  window.addEventListener('scroll', () => {
    document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 10);
  });
  // hamburger
  document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('open');
  });
  // lang buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === LANG);
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });
  // active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === path);
  });
}

// Fade-in on scroll (re-observes newly added .fade-in elements each call)
function initFade() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
    // safety net: reveal immediately if already visible in viewport when observed
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
    else obs.observe(el);
  });
}

// Toast notification
function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3200);
}

// Lightbox
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const img = lb.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      img.src = item.dataset.full || item.querySelector('img').src;
      lb.classList.add('open');
    });
  });
  lb.querySelector('.lb-close')?.addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
}

// Format date
function fmtDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = {
    ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    kz: ['қаңтар','ақпан','наурыз','сәуір','мамыр','маусым','шілде','тамыз','қыркүйек','қазан','қараша','желтоқсан']
  };
  const m = LANG === 'kz' ? months.kz : months.ru;
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

// Send submission to email via FormSubmit.co or Formspree
async function sendSubmissionToEmail(submission, settings) {
  const body = {
    name: submission.name,
    phone: submission.phone,
    message: submission.message || '(без сообщения)',
    page: submission.page,
    _subject: `Новая заявка с сайта «${settings.siteName || 'Сайт'}» — ${submission.name}`,
    _template: 'table'
  };
  // Priority 1: Formspree (if configured)
  if (settings.formspreeUrl) {
    const r = await fetch(settings.formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    });
    return r.ok;
  }
  // Priority 2: FormSubmit.co
  if (settings.notifyEmail) {
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(settings.notifyEmail)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    });
    return r.ok;
  }
  return null; // not configured
}

// Contact form submit — saves to localStorage so admin can view submissions, and sends to email if configured
function initContactForm() {
  document.querySelectorAll('.js-contact-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const name  = (form.querySelector('#cf-name')?.value || '').trim();
      const phone = (form.querySelector('#cf-phone, #cf-phone-inp')?.value || '').trim();
      const msg   = (form.querySelector('#cf-msg')?.value || '').trim();
      if (!name || !phone) {
        showToast(t('Заполните имя и телефон','Аты-жөні мен телефонды толтырыңыз'), 'error');
        return;
      }
      const submission = {
        id: Date.now(),
        name, phone, message: msg,
        date: new Date().toISOString(),
        page: location.pathname.split('/').pop() || 'index.html'
      };
      let settings = {};
      try {
        const d = (typeof getData === 'function') ? getData() : null;
        if (d) settings = d.settings || {};
      } catch(err) { console.warn('getData failed:', err); }

      // Save submission: server (preferred) or localStorage fallback
      try {
        if (typeof isServerMode === 'function' && isServerMode()) {
          // Public submit endpoint — без авторизации
          submitContactForm(submission).catch(e => console.warn('Server submit failed:', e));
        } else if (typeof getData === 'function') {
          const d = getData();
          d.submissions = d.submissions || [];
          d.submissions.unshift(submission);
          saveData(d);
        }
      } catch(err) { console.warn('Submission save failed:', err); }

      // Try to send to email
      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = t('Отправка...', 'Жіберілуде...'); }
      try {
        const result = await sendSubmissionToEmail(submission, settings);
        if (result === true) {
          showToast(t('✅ Сообщение отправлено! Мы свяжемся с вами.', '✅ Хабарлама жіберілді! Біз сізбен хабарласамыз.'));
        } else if (result === false) {
          showToast(t('⚠️ Сообщение сохранено, но не доставлено на email. Мы свяжемся с вами.', '⚠️ Хабарлама сақталды, бірақ email-ге жеткізілмеді.'), 'error');
        } else {
          // not configured — keep old behavior
          showToast(t('Сообщение отправлено! Мы свяжемся с вами.', 'Хабарлама жіберілді! Біз сізбен хабарласамыз.'));
        }
      } catch(err) {
        console.warn('Email send failed:', err);
        showToast(t('⚠️ Сообщение сохранено локально. Мы свяжемся с вами.', '⚠️ Хабарлама жергілікті сақталды.'), 'error');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = origText; }
      }
      form.reset();
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // Загружаем данные с сервера (или из localStorage если PHP недоступен) ДО рендера.
  if (typeof initData === 'function') {
    try { await initData(); } catch(e) { console.warn('initData failed:', e); }
  }
  initHeader();
  initContactForm();
  if (typeof render === 'function') {
    const r = render();
    if (r && typeof r.then === 'function') await r;
  }
  // Observe fade-in and init lightbox AFTER render populates dynamic content
  initFade();
  initLightbox();
});
