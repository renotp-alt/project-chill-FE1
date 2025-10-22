(async function init(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id){ location.href = 'index.html'; return; }

  // Ambil data
  const data =
    (await fetch('/assets/movies.json').catch(()=>null)) ||
    (await fetch('assets/movies.json').catch(()=>null));

  const movies = data && data.ok ? await data.json() : [];
  const movie = movies.find(m=>String(m.id) === String(id));
  if(!movie){ location.href = 'index.html'; return; }

  // Isi hero & info
  const hero = document.getElementById('heroMedia');
  const titleEl = document.getElementById('title');
  const metaEl = document.getElementById('meta');
  const overview = document.getElementById('overview');
  const cast = document.getElementById('cast');
  const genres = document.getElementById('genres');
  const creators = document.getElementById('creators');

  const heroBg = movie.backdrop || movie.poster;
  if(heroBg) hero.style.backgroundImage = `url('${heroBg}')`;
  hero.setAttribute('aria-label', movie.title || '');

  titleEl.textContent = movie.title || '';
  metaEl.textContent = [movie.year, movie.duration, movie.rating].filter(Boolean).join('  ·  ');
  overview.textContent = movie.overview || '';

  cast.textContent = (movie.cast || []).join(', ');
  genres.textContent = (movie.genres || []).join(', ');
  creators.textContent = (movie.creators || []).join(', ');

  // Episode (khusus series)
  if((movie.type || '').toLowerCase() === 'series' && Array.isArray(movie.episodes)){
    const sec = document.getElementById('episodesSec');
    const list = document.getElementById('episodesList');
    sec.hidden = false;

    const fallbackImg = movie.backdrop || movie.poster || '';
    list.innerHTML = movie.episodes.map(ep=>{
      const img = ep.image && ep.image.trim() ? ep.image : fallbackImg;
      return `
        <li class="episode-card">
          <div class="episode-no">${ep.no ?? ''}</div>
          <div class="episode-thumb" style="background-image:url('${img}')"></div>
          <div>
            <div class="episode-title">${ep.title ?? ''}</div>
            <div class="episode-desc">${ep.desc ?? ''}</div>
          </div>
          <div class="episode-runtime">${ep.runtime ?? ''}</div>
        </li>
      `;
    }).join('');
  }
})();
