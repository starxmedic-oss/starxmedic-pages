const menuButton = document.querySelector('[data-menu-button]');
const mobileNav = document.querySelector('[data-mobile-nav]');

if (menuButton && mobileNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    mobileNav.hidden = true;
  };

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
    mobileNav.hidden = expanded;
    if (!expanded) mobileNav.querySelector('a')?.focus();
  });

  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
}

const form = document.querySelector('[data-whatsapp-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.dataset.formStatus === 'blocked') return;

    const name = String(form.querySelector('#nombre')?.value || '').trim();
    const organization = String(form.querySelector('#organizacion')?.value || '').trim();
    const contact = String(form.querySelector('#contacto-dato')?.value || '').trim();
    const problem = String(form.querySelector('#problema')?.value || '').trim();

    if (!name || !contact || !problem) {
      form.reportValidity();
      return;
    }

    const lines = [
      'Hola José, quiero conversar sobre un problema que necesitamos resolver.',
      '',
      `Nombre: ${name}`,
      organization ? `Organización: ${organization}` : null,
      `Correo o WhatsApp: ${contact}`,
      '',
      'Problema:',
      problem
    ].filter((line) => line !== null);

    const url = `https://wa.me/51937397461?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
