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

const contactForm = document.querySelector('[data-whatsapp-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (contactForm.dataset.formStatus === 'blocked') return;

    const name = String(contactForm.querySelector('#nombre')?.value || '').trim();
    const organization = String(contactForm.querySelector('#organizacion')?.value || '').trim();
    const contact = String(contactForm.querySelector('#contacto-dato')?.value || '').trim();
    const problem = String(contactForm.querySelector('#problema')?.value || '').trim();

    if (!name || !contact || !problem) {
      contactForm.reportValidity();
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
    ].filter(Boolean);

    const url = `https://wa.me/51937397461?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

const bookingDemos = document.querySelectorAll('[data-booking-demo]');

bookingDemos.forEach((demo) => {
  const panels = [...demo.querySelectorAll('[data-demo-panel]')];
  const progress = [...demo.querySelectorAll('[data-progress]')];
  const slotButtons = [...demo.querySelectorAll('[data-slot]')];
  const nextButtons = [...demo.querySelectorAll('[data-demo-next]')];
  const backButtons = [...demo.querySelectorAll('[data-demo-back]')];
  const resetButtons = [...demo.querySelectorAll('[data-demo-reset]')];
  const dataForm = demo.querySelector('[data-demo-data-form]');
  let step = 0;
  let selectedSlot = '';

  const setStep = (nextStep) => {
    step = Math.max(0, Math.min(nextStep, panels.length - 1));
    panels.forEach((panel, index) => {
      const active = index === step;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
    progress.forEach((item, index) => item.classList.toggle('is-active', index === step));
    demo.querySelectorAll('[data-selected-slot]').forEach((item) => {
      item.textContent = selectedSlot || 'Horario seleccionado';
    });
    panels[step]?.querySelector('h3')?.focus?.({ preventScroll: true });
  };

  const reset = () => {
    selectedSlot = '';
    slotButtons.forEach((button) => button.setAttribute('aria-pressed', 'false'));
    nextButtons.forEach((button, index) => {
      if (index === 0) button.disabled = true;
    });
    dataForm?.reset();
    setStep(0);
    slotButtons[0]?.focus();
  };

  slotButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedSlot = button.dataset.slot || '';
      slotButtons.forEach((slot) => slot.setAttribute('aria-pressed', String(slot === button)));
      const firstNext = demo.querySelector('[data-demo-panel="0"] [data-demo-next]');
      if (firstNext) firstNext.disabled = false;
    });
  });

  nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (step === 0 && !selectedSlot) return;
      setStep(step + 1);
    });
  });

  backButtons.forEach((button) => button.addEventListener('click', () => setStep(step - 1)));
  resetButtons.forEach((button) => button.addEventListener('click', reset));

  dataForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!dataForm.reportValidity()) return;
    setStep(2);
  });
});
