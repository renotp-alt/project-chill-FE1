// Klik kartu → ke halaman detail
document.addEventListener('click', (e)=>{
  const link = e.target.closest('.card[data-id], .card[data-id] a.card-link');
  if(!link) return;
  const card = link.closest('.card[data-id]');
  const id = card?.dataset.id;
  if(!id) return;
  e.preventDefault();
  location.href = `film.html?id=${encodeURIComponent(id)}`;
});

// Filter genre dari header
document.addEventListener('filter:genre', ({detail})=>{
  const genre = detail.genre;
  const cards = document.querySelectorAll('.card[data-genres]');
  if(genre === 'all'){
    cards.forEach(c=>c.style.display='');
    return;
  }
  cards.forEach(c=>{
    const has = (c.dataset.genres || '').toLowerCase().includes(genre.toLowerCase());
    c.style.display = has ? '' : 'none';
  });
});
