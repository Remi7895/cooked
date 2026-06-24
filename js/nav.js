/* Shared navigation & footer injector */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: 'index.html',          label: 'Accueil' },
    { href: 'recettes.html',       label: 'Recettes' },
    { href: 'boutique.html',       label: 'Boutique' },
    { href: 'professionnels.html', label: 'Professionnels' },
    { href: 'a-propos.html',       label: 'À propos' },
  ];

  const navHtml = `
    <nav class="nav" role="navigation" aria-label="Navigation principale">
      <div class="nav__inner">
        <a href="index.html" class="nav__logo">Cooked<span>.</span></a>
        <div class="nav__links">
          ${links.map(l => `<a href="${l.href}" class="nav__link${page === l.href ? ' active' : ''}">${l.label}</a>`).join('')}
        </div>
        <div class="nav__actions">
          <a href="compte.html" class="btn btn--ghost btn--md" id="nav-account-btn">
            <i class="ti ti-user" aria-hidden="true"></i>Mon compte
          </a>
        </div>
        <button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="nav__mobile" id="mobileMenu" role="dialog" aria-label="Menu mobile">
      ${links.map(l => `<a href="${l.href}" class="nav__link${page === l.href ? ' active' : ''}">${l.label}</a>`).join('')}
      <a href="compte.html" class="nav__link">Mon compte</a>
    </div>
  `;

  const footerHtml = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__logo">Cooked<span>.</span></div>
            <p class="footer__desc">Des recettes pensées pour être cuisinées, pas seulement lues. Pour les amateurs exigeants et ceux qui veulent le devenir.</p>
            </div>
          <div>
            <div class="footer__col-title">Explorer</div>
            <nav class="footer__links" aria-label="Liens explorer">
              <a href="recettes.html">Toutes les recettes</a>
              <a href="recettes.html?f=gratuit">Recettes gratuites</a>
              <a href="boutique.html">Boutique</a>
              <a href="professionnels.html">Professionnels</a>
            </nav>
          </div>
          <div>
            <div class="footer__col-title">Compte</div>
            <nav class="footer__links" aria-label="Liens compte">
              <a href="compte.html">Mon espace</a>
              <a href="compte.html#favoris">Mes favoris</a>
              <a href="compte.html#achats">Mes achats</a>
              <a href="compte.html#parametres">Paramètres</a>
            </nav>
          </div>
          <div>
            <div class="footer__col-title">Infos</div>
            <nav class="footer__links" aria-label="Liens infos">
              <a href="a-propos.html">À propos</a>
              <a href="contact.html">Contact</a>
              <a href="mentions.html">Mentions légales</a>
              <a href="mentions.html#cgu">CGU</a>
              <a href="mentions.html#cgv">CGV</a>
            </nav>
          </div>
        </div>
        <div class="footer__bottom">
          <span class="footer__copy">© ${new Date().getFullYear()} Cooked. Tous droits réservés.</span>
          <div class="footer__legal">
            <a href="mentions.html">Mentions légales</a>
            <a href="mentions.html#cgu">CGU</a>
            <a href="mentions.html#cgv">CGV</a>
          </div>
        </div>
      </div>
    </footer>
    <div class="toast" id="toast"></div>
  `;

  document.getElementById('nav-placeholder').outerHTML = navHtml;
  document.getElementById('footer-placeholder').outerHTML = footerHtml;

  // Burger menu
  document.getElementById('burger').addEventListener('click', function () {
    const menu = document.getElementById('mobileMenu');
    const open = menu.classList.toggle('open');
    this.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav__mobile .nav__link').forEach(l => {
    l.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('burger').setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* Auth nav update */
(async function () {
  if (!window._sb) return;
  const { data: { session } } = await window._sb.auth.getSession();
  if (!session) return;
  const meta = session.user.user_metadata || {};
  const pseudo = meta.full_name || session.user.email.split('@')[0];
  const btn = document.getElementById('nav-account-btn');
  if (btn) btn.innerHTML = `<i class="ti ti-user-check" aria-hidden="true"></i>${pseudo}`;
})();

/* Toast utility */
function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

/* Newsletter handler */
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast('Merci ! Vous êtes inscrit(e) à la newsletter.');
  input.value = '';
  return false;
}
