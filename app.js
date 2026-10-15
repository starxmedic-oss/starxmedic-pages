(() => {
  const header = document.querySelector('[data-header]');
  const menuBtn = document.querySelector('[data-menu]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 10);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuBtn?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', mobileNav?.classList.contains('open') ? 'true' : 'false');
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  document.querySelectorAll('[data-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.scroll);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const links = [...document.querySelectorAll('.desktop-nav a')];
  const sections = links
    .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter(x => x.section);

  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach(l => l.classList.remove('active'));
    const match = sections.find(x => x.section === visible.target);
    match?.link.classList.add('active');
  }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.2, 0.5] });

  sections.forEach(x => navObserver.observe(x.section));
})();