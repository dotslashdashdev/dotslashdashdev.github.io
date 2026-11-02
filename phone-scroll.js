(() => {
  const hero = document.querySelector('.dsd-hero');
  const phone = hero.querySelector('.dsd-phone');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;

  function paint() {
    scheduled = false;
    const frame = hero.getBoundingClientRect();
    // Let the app remain recognizable as the masthead scrolls away.
    const mix = Math.max(0, Math.min(1, (48 - frame.top) / (frame.height * .48)));
    phone.style.setProperty('--screen-mix', reduceMotion.matches ? Number(mix >= 0.5) : mix);
  }

  function schedulePaint() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(paint);
    }
  }

  paint();
  window.addEventListener('scroll', schedulePaint, { passive: true });
  window.addEventListener('resize', schedulePaint);
  window.addEventListener('pageshow', schedulePaint);
  reduceMotion.addEventListener('change', schedulePaint);
})();
