// Native scrolling also works from a local HTML file, without Webflow.
document.querySelectorAll('[data-project-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.project-gallery-track');
  const slides = Array.from(track.querySelectorAll('.project-gallery-slide'));
  const previous = carousel.querySelector('[data-gallery-prev]');
  const next = carousel.querySelector('[data-gallery-next]');
  function update() {
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maximum - 1;
  }

  function layout() {
    // Only the image rail extends beyond the centered content container.
    // Use clientWidth so the rail ends before the vertical scrollbar.
    const available = document.documentElement.clientWidth - track.getBoundingClientRect().left;
    track.style.setProperty('--gallery-edge-width', `${Math.max(0, available)}px`);
    update();
  }

  function behavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  }

  function move(direction) {
    const step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: behavior() });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: behavior() });
    }
  });

  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
  if ('ResizeObserver' in window) new window.ResizeObserver(layout).observe(carousel);
  layout();
});
