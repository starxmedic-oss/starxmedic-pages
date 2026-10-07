(() => {
  const number = window.STARX_CONFIG?.whatsappNumber || "";
  const validNumber = /^[1-9]\d{7,14}$/.test(number);
  const message = "Hola, quiero activar el Plan Fundador de SANA para mi centro.";
  const dialog = document.querySelector("#contact-dialog");
  for (const link of document.querySelectorAll("[data-activate]")) {
    if (validNumber) {
      link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#contact-dialog";
      link.addEventListener("click", event => { event.preventDefault(); dialog?.showModal(); });
    }
  }
  document.querySelector("[data-close-dialog]")?.addEventListener("click", () => dialog.close());
  if (!validNumber) document.querySelectorAll("[data-contact-status]").forEach(el => el.hidden = false);
})();
