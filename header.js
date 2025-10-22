// Inject header ke semua halaman
(async function injectHeader(){
  const mount = document.querySelector('[data-include="header"]');
  if(!mount) return;

  const res =
    (await fetch('/partials/header.html').catch(()=>null)) ||
    (await fetch('partials/header.html').catch(()=>null));

  if(!res || !res.ok) return;
  mount.innerHTML = await res.text();
  wireHeader();
})();

function wireHeader(){
  // Tandai link aktif
  const path = (location.pathname.split('/').pop() || 'home.html').toLowerCase();
  document.querySelectorAll('.nav a[data-nav]').forEach(a=>{
    const key = a.getAttribute('data-nav');
    const map = { home:'home.html', 'my-list':'my-list.html' };
    if (map[key] && map[key].toLowerCase() === path) a.classList.add('active');
  });

  // Hamburger (mobile)
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if(ham && nav){
    ham.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      ham.setAttribute('aria-expanded', String(open));
    });
  }

  // Dropdown Genre
  const toggle = document.querySelector('.dropdown-toggle');
  const menu = document.getElementById('genreMenu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('show');
    });

    menu.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-genre]');
      if(!btn) return;
      const genre = btn.dataset.genre;
      document.dispatchEvent(new CustomEvent('filter:genre', { detail: { genre } }));
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('show');
    });

    document.addEventListener('click', (e)=>{
      if(!menu.contains(e.target) && !toggle.contains(e.target)){
        toggle.setAttribute('aria-expanded','false');
        menu.classList.remove('show');
      }
    });
  }
}
