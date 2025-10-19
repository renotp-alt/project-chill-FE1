/* global React, ReactDOM */

const { useEffect, useRef } = React;

function Header() {
  return (
    <header className="header">
      <div className="topbar">
        <div className="brand">
          <i className="brand-icon" aria-hidden="true">🎬</i> <span>CHILL</span>
        </div>
        <nav aria-label="Navigasi utama">
          <a href="#" aria-current="page">Series</a>
          <a href="#">Film</a>
          <a href="#">Daftar Saya</a>
        </nav>
        <div className="avatar" title="Profil" aria-label="Profil"></div>
      </div>
    </header>
  );
}

function Hero({ title, description, ageTag }) {
  return (
    <section className="hero" aria-label="Hero film pilihan">
      <div className="hero-inner">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="actions">
          <a className="btn" href="#">Mulai</a>
          <a className="btn-outline" href="#">Selengkapnya</a>
          <span className="tag">{ageTag}</span>
        </div>
      </div>
    </section>
  );
}

function Card({ img, alt, label }) {
  return (
    <article className="card">
      <img loading="lazy" src={img} alt={alt} onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = 'https://via.placeholder.com/300x450?text=Poster';
      }} />
      <div className="overlay"><p>{label}</p></div>
    </article>
  );
}

function useHorizontalScroller(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const onDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
    };
    const onLeave = () => { isDown = false; el.classList.remove('dragging'); };
    const onUp = () => { isDown = false; el.classList.remove('dragging'); };
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointermove', onMove);
    };
  }, [ref]);
}

function Scroller({ ariaLabel, children }) {
  const ref = useRef(null);
  useHorizontalScroller(ref);
  return (
    <div ref={ref} className="scroller" tabIndex={0} aria-label={ariaLabel}>
      {children}
    </div>
  );
}

function Section({ title, items }) {
  return (
    <section className="section">
      <h3>{title}</h3>
      <Scroller ariaLabel={`${title} (geser untuk melihat lainnya)`}>
        {items.map((it, idx) => (
          <Card key={idx} img={it.img} alt={it.alt} label={it.label} />
        ))}
      </Scroller>
    </section>
  );
}

const data = {
  hero: {
    title: 'Duty After School',
    description: 'Sebuah benda tak dikenal mengancam dunia. Siswa sekolah menengah direkrut menjadi pasukan pertahanan.',
    ageTag: '18+',
  },
  sections: [
    {
      title: 'Melanjutkan Tonton Film',
      items: [
        { img: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', alt: 'The Matrix poster', label: 'The Matrix • ★ 4.7' },
        { img: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', alt: 'Barbie poster', label: 'Barbie • ★ 4.3/5' },
        { img: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', alt: 'Spider-Man: No Way Home poster', label: 'No Way Home • ★ 4.4/5' },
        { img: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', alt: 'The Batman poster', label: 'The Batman • ★ 4.2/5' },
        { img: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', alt: 'Joker poster', label: 'Joker • ★ 4.6/5' },
        { img: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', alt: 'Avatar: The Way of Water poster', label: 'Avatar: The Way of Water • ★ 4.1/5' },
      ],
    },
    {
      title: 'Top Rating Film dan Series Hari ini',
      items: [
        { img: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', alt: 'Interstellar poster', label: 'Interstellar • ★ 4.8' },
        { img: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', alt: 'Across the Spider-Verse poster', label: 'Across the Spider-Verse • ★ 4.8/5' },
        { img: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg', alt: 'The Dark Knight poster', label: 'The Dark Knight • ★ 4.9' },
        { img: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', alt: 'Dune poster', label: 'Dune • ★ 4.4' },
        { img: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', alt: 'Guardians poster', label: 'Guardians • ★ 4.5' },
        { img: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', alt: 'John Wick: Chapter 4 poster', label: 'John Wick 4 • ★ 4.3' },
      ],
    },
    {
      title: 'Film Trending',
      items: [
        { img: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg', alt: 'The Super Mario Bros. Movie poster', label: 'Super Mario Bros • ★ 4.1' },
        { img: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg', alt: 'Mission: Impossible – Dead Reckoning poster', label: 'Mission: Impossible 7 • ★ 4.2' },
        { img: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', alt: 'Top Gun: Maverick poster', label: 'Top Gun: Maverick • ★ 4.6' },
        { img: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg', alt: 'Black Panther: Wakanda Forever poster', label: 'Wakanda Forever • ★ 4.0' },
        { img: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg', alt: 'Coco poster', label: 'Coco • ★ 4.7' },
        { img: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg', alt: 'Free Guy poster', label: 'Free Guy • ★ 4.1' },
      ],
    },
    {
      title: 'Rilis Baru',
      items: [
        { img: 'https://image.tmdb.org/t/p/w500/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg', alt: 'The Little Mermaid poster', label: 'The Little Mermaid • New' },
        { img: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', alt: 'Dune: Part Two poster', label: 'Dune: Part Two • New' },
        { img: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', alt: 'Top Gun: Maverick poster', label: 'Top Gun: Maverick • New' },
        { img: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg', alt: 'The Super Mario Bros. Movie poster', label: 'Super Mario Bros • New' },
        { img: 'https://image.tmdb.org/t/p/w500/ykUEbfpkf8d0w49pHh0AD2KrT52.jpg', alt: 'Interstellar (varian) poster', label: 'Interstellar (Varian) • New' },
        { img: 'https://image.tmdb.org/t/p/w500/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg', alt: 'Free Guy (varian) poster', label: 'Free Guy (Varian) • New' },
      ],
    },
  ],
};

function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <div className="logo-row"><i className="logo-box" aria-hidden="true">🎬</i> <span>CHILL</span></div>
          <p className="copy">©2025 Chill All Rights Reserved.</p>
        </div>
        <div className="foot-block foot-genre">
          <div className="foot-title">Genre</div>
          <ul className="foot-list genre-cols">
            <li>Aksi</li><li>Drama</li><li>Komedi</li><li>Sains & Alam</li>
            <li>Anak-anak</li><li>Fantasi Ilmiah & Fantasi</li>
            <li>Petualangan</li><li>Thriller</li>
            <li>Anime</li><li>Kejahatan</li><li>Perang</li><li>Romantis</li>
            <li>Britania</li><li>KDrama</li>
          </ul>
        </div>
        <div className="foot-block foot-help">
          <div className="foot-title">Bantuan</div>
          <ul className="foot-list">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Kontak Kami</a></li>
            <li><a href="#">Privasi</a></li>
            <li><a href="#">Syarat & Ketentuan</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main className="container" role="main">
        <Hero {...data.hero} />
        {data.sections.map((section) => (
          <Section key={section.title} title={section.title} items={section.items} />
        ))}
      </main>
      <Footer />
    </>
  );
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);


