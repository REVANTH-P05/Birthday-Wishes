/**
 * BirthdayVerse – Gallery Module
 * Photo gallery with carousel and full-screen lightbox.
 */

const Gallery = (() => {
  let photos = [];
  let currentIndex = 0;
  let isLightboxOpen = false;

  // ── Build Gallery Grid ──
  function buildGrid(containerId, photoList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    photos = photoList;

    if (photos.length === 0) {
      container.innerHTML = `
        <div class="gallery-empty">
          <div class="gallery-empty-icon">🖼️</div>
          <p>No photos added yet.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = photos.map((photo, i) => `
      <div class="gallery-item reveal-scale" style="animation-delay: ${i * 0.06}s" data-index="${i}">
        <div class="gallery-item-inner">
          <img src="${photo.src}" alt="Memory ${i + 1}" loading="lazy">
          <div class="gallery-item-overlay">
            <button class="gallery-zoom-btn" data-index="${i}" aria-label="View photo ${i + 1}">
              🔍
            </button>
          </div>
          ${photo.caption ? `<div class="gallery-caption">${photo.caption}</div>` : ''}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.gallery-zoom-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(parseInt(btn.dataset.index));
      });
    });

    container.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        openLightbox(parseInt(item.dataset.index));
      });
    });
  }

  // ── Build Carousel ──
  function buildCarousel(containerId, photoList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    photos = photoList;
    currentIndex = 0;

    if (photos.length === 0) {
      container.innerHTML = `<div class="gallery-empty"><p>No photos uploaded.</p></div>`;
      return;
    }

    container.innerHTML = `
      <div class="gallery-carousel">
        <div class="gallery-carousel-track" id="carousel-track">
          ${photos.map((photo, i) => `
            <div class="gallery-carousel-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
              <img src="${photo.src}" alt="Memory ${i + 1}" loading="lazy">
              ${photo.caption ? `<div class="gallery-slide-caption">${photo.caption}</div>` : ''}
            </div>
          `).join('')}
        </div>
        <button class="gallery-btn gallery-prev" id="gallery-prev" aria-label="Previous">‹</button>
        <button class="gallery-btn gallery-next" id="gallery-next" aria-label="Next">›</button>
        <div class="gallery-dots" id="gallery-dots">
          ${photos.map((_, i) => `
            <button class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to photo ${i + 1}"></button>
          `).join('')}
        </div>
        <button class="gallery-fullscreen-btn" id="gallery-fullscreen" aria-label="View fullscreen">⛶</button>
      </div>
    `;

    // Events
    document.getElementById('gallery-prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo((currentIndex - 1 + photos.length) % photos.length);
    });
    document.getElementById('gallery-next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo((currentIndex + 1) % photos.length);
    });
    document.getElementById('gallery-fullscreen')?.addEventListener('click', () => {
      openLightbox(currentIndex);
    });

    container.querySelectorAll('.gallery-dot').forEach(dot => {
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
    });

    // Touch/swipe
    let touchStartX = 0;
    const track = document.getElementById('carousel-track');
    if (track) {
      track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
      track.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
          goTo(dx < 0
            ? (currentIndex + 1) % photos.length
            : (currentIndex - 1 + photos.length) % photos.length
          );
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (isLightboxOpen) return;
      if (e.key === 'ArrowLeft') goTo((currentIndex - 1 + photos.length) % photos.length);
      if (e.key === 'ArrowRight') goTo((currentIndex + 1) % photos.length);
    });
  }

  function goTo(index) {
    const slides = document.querySelectorAll('.gallery-carousel-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentIndex = index;
    slides[currentIndex]?.classList.add('active');
    dots[currentIndex]?.classList.add('active');
  }

  // ── Lightbox ──
  function openLightbox(index) {
    if (photos.length === 0) return;
    currentIndex = index;
    isLightboxOpen = true;

    let lightbox = document.getElementById('bv-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'bv-lightbox';
      lightbox.className = 'lightbox-overlay';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" id="lightbox-close" aria-label="Close">✕</button>
          <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous">‹</button>
          <div class="lightbox-img-container">
            <img id="lightbox-img" src="" alt="">
            <div id="lightbox-caption" class="lightbox-caption"></div>
          </div>
          <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next">›</button>
          <div id="lightbox-counter" class="lightbox-counter"></div>
        </div>
      `;
      document.body.appendChild(lightbox);

      document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
      document.getElementById('lightbox-prev').addEventListener('click', () => lightboxGoTo((currentIndex - 1 + photos.length) % photos.length));
      document.getElementById('lightbox-next').addEventListener('click', () => lightboxGoTo((currentIndex + 1) % photos.length));
      lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

      let touchStart = 0;
      lightbox.addEventListener('touchstart', (e) => { touchStart = e.changedTouches[0].clientX; }, { passive: true });
      lightbox.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStart;
        if (Math.abs(dx) > 40) lightboxGoTo(dx < 0 ? (currentIndex + 1) % photos.length : (currentIndex - 1 + photos.length) % photos.length);
      });

      document.addEventListener('keydown', lightboxKeyHandler);
    }

    lightbox.classList.add('open');
    lightboxGoTo(currentIndex);
    document.body.style.overflow = 'hidden';
  }

  function lightboxGoTo(index) {
    currentIndex = index;
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    if (img) {
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = photos[currentIndex].src;
        img.alt = `Memory ${currentIndex + 1}`;
        img.style.opacity = '1';
      }, 150);
    }
    if (caption) caption.textContent = photos[currentIndex].caption || '';
    if (counter) counter.textContent = `${currentIndex + 1} / ${photos.length}`;
  }

  function closeLightbox() {
    const lightbox = document.getElementById('bv-lightbox');
    if (lightbox) lightbox.classList.remove('open');
    isLightboxOpen = false;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', lightboxKeyHandler);
  }

  function lightboxKeyHandler(e) {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxGoTo((currentIndex - 1 + photos.length) % photos.length);
    if (e.key === 'ArrowRight') lightboxGoTo((currentIndex + 1) % photos.length);
  }

  return { buildGrid, buildCarousel, goTo, openLightbox, closeLightbox };
})();

window.Gallery = Gallery;
