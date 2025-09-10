// cookie.js
(function () {
  const COOKIE_NAME = 'cookiesok';

  const hasCookie = (name) =>
    document.cookie.split('; ').some(row => row.startsWith(name + '='));

  const setCookie = (name, value, days) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  };

  const injectStyles = () => {
    if (document.getElementById('cookie-banner-style')) return;
    const css = `
      .cookie-banner {
        position: fixed; left: 0; right: 0; bottom: -140px;
        background:#ceecf7; color:#232323; padding:14px 18px;
        display:flex; gap:14px; justify-content:center; align-items:center;
        font-size:14px; z-index:9999; transition: bottom .4s ease-in-out;
        box-shadow: 0 -4px 14px rgba(0,0,0,.35); border-top:3px solid #ff3c3c;
      }
      .cookie-banner.show { bottom: 0; }
      .cookie-banner button {
        background:#ff3c3c; border:0; color:#fff; padding:6px 14px;
        border-radius:6px; cursor:pointer; font-weight:600;
        transition:filter .2s ease-in-out;
      }
      .cookie-banner button:hover { filter:brightness(.95); }
    `;
    const style = document.createElement('style');
    style.id = 'cookie-banner-style';
    style.textContent = css;
    document.head.appendChild(style);
  };

  const createBanner = () => {
    const banner = document.createElement('div');
    banner.id = 'cookie-warn';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <span>Ta strona używa ciasteczek 🍪. Korzystając dalej, akceptujesz ich użycie.</span>
      <button id="close-cookie-warn" type="button">OK</button>
    `;
    document.body.appendChild(banner);
    return banner;
  };

  const init = () => {
    if (hasCookie(COOKIE_NAME)) return;
    injectStyles();
    const banner = createBanner();
    requestAnimationFrame(() => banner.classList.add('show')); // ładny wjazd
    banner.querySelector('#close-cookie-warn').addEventListener('click', () => {
      setCookie(COOKIE_NAME, '1', 365);
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 450);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
