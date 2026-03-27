(function () {
  const CTA_URL = "https://wa.me/?text=Hola%2C%20quiero%20activar%20mi%20sistema%20StarX%20y%20ver%20una%20demo";
  const CTA_TEXT = "Activar sistema";

  if (document.querySelector(".starx-cta")) return;

  const style = document.createElement("style");
  style.textContent = `
    .starx-cta {
      position: fixed;
      right: 24px;
      bottom: 24px;
      z-index: 9999;
      background: linear-gradient(120deg,#25d366,#128c7e);
      color: #041007;
      font-family: "Space Grotesk","Segoe UI",sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.25rem;
      font-size: 12px;
      padding: 14px 28px;
      border-radius: 999px;
      border: none;
      text-decoration: none;
      box-shadow: 0 15px 40px rgba(0,0,0,0.35);
    }
  `;
  document.head.appendChild(style);

  const button = document.createElement("a");
  button.href = CTA_URL;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.textContent = CTA_TEXT;
  button.className = "starx-cta";

  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(button);
  });
})();
