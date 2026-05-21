function initPage(active) {

  // NAV — "Услуги" stays active for all service sub-pages too
  const isService = [
    'service-vnj','service-visas','service-relocation','service-family',
    'service-education','service-diploma','service-documents','service-business','service-children'
  ].includes(active);

  document.getElementById('nav').innerHTML = `
    <a href="index.html" class="nav-logo">Италия<span>Дом</span></a>
    <ul class="nav-links">
      <li><a href="index.html"    ${active==='home'                   ? 'class="active"' : ''}>Главная</a></li>
      <li><a href="services.html" ${active==='services' || isService  ? 'class="active"' : ''}>Услуги</a></li>
      <li><a href="visas.html"    ${active==='visas'                  ? 'class="active"' : ''}>Визы и ВНЖ</a></li>
      <li><a href="contact.html"  ${active==='contact'                ? 'class="active"' : ''}>Контакты</a></li>
    </ul>
    <a href="contact.html" class="nav-cta">Получить консультацию</a>
    <button class="nav-burger" onclick="toggleMenu()" aria-label="Меню">
      <span></span><span></span><span></span>
    </button>`;

  // MOBILE MENU
  document.getElementById('mobile-menu').innerHTML = `
    <a href="index.html">Главная</a>
    <a href="services.html">Услуги</a>
    <a href="visas.html">Визы и ВНЖ</a>
    <a href="contact.html">Контакты</a>
    <a href="contact.html" class="mob-cta">Получить консультацию</a>`;

  // FOOTER
  document.getElementById('footer').innerHTML = `
    <div class="footer-top">
      <div>
        <a href="index.html" class="footer-logo">Италия<span>Дом</span></a>
        <p class="footer-desc">Помогаем переехать в Италию из России и стран СНГ. От визы до ПМЖ — без лишней бюрократии.</p>
      </div>
      <div class="footer-col">
        <h4>Услуги</h4>
        <ul>
          <li><a href="service-vnj.html">Вид на жительство</a></li>
          <li><a href="service-visas.html">Визы в Италию и Шенген</a></li>
          <li><a href="service-relocation.html">Переезд под ключ</a></li>
          <li><a href="service-family.html">Семейная иммиграция</a></li>
          <li><a href="service-education.html">Образование</a></li>
          <li><a href="service-business.html">Бизнес в Италии</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Компания</h4>
        <ul>
          <li><a href="index.html">О нас</a></li>
          <li><a href="index.html">Команда</a></li>
          <li><a href="index.html">Отзывы</a></li>
          <li><a href="index.html">Блог</a></li>
          <li><a href="contact.html">Контакты</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Контакты</h4>
        <ul>
          <li><a href="https://t.me/alvedagroup" target="_blank" rel="noopener">Telegram</a></li>
          <li><a href="https://wa.me/393343034054" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="https://instagram.com/alvedagroup" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="mailto:info@alvedagroup.com">info@alvedagroup.com</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-contacts-mobile">
      <a href="https://t.me/alvedagroup" target="_blank" rel="noopener">Telegram</a>
      <a href="https://wa.me/393343034054" target="_blank" rel="noopener">WhatsApp</a>
      <a href="https://instagram.com/alvedagroup" target="_blank" rel="noopener">Instagram</a>
      <a href="mailto:info@alvedagroup.com">info@alvedagroup.com</a>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 ИталияДом. Иммиграционные услуги.</div>
      <div class="footer-flags">🇮🇹 🇷🇺 🇺🇦 🇰🇿 🇧🇾</div>
    </div>`;

  initScrollAnimations();
  initNavScroll();
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
  document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.remove('open');
    });
  });
}

function initNavScroll() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

function initScrollAnimations() {
  const selectors = [
    '.section-tag', '.section-title', '.section-sub',
    '.service-card', '.visa-card', '.process-step',
    '.testimonial-card', '.faq-item',
    '.benefits-strip .benefit-item',
    '.cta-section .section-tag', '.cta-section .section-title',
    '.cta-section .section-sub', '.cta-actions',
    '.cc-item', '.contact-note', '.contact-form',
  ];

  const allEls = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('fade-up') && !el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');
        allEls.push(el);
      }
    });
  });

  // Stagger grid items
  [
    ['.services-grid .service-card', 3],
    ['.visa-grid .visa-card', 3],
    ['.testimonials-grid .testimonial-card', 1],
    ['.process-steps .process-step', 1],
    ['.benefits-strip .benefit-item', 1],
  ].forEach(([sel, cols]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = `${(cols > 1 ? (i % cols) : i) * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  allEls.forEach(el => observer.observe(el));
}
