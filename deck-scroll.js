// dotslashdash.com copy (2026-11-03, user request): animate the three portrait cards the way the
// /hello invitation deck moves — they fan out from a stack when the section comes into view, then
// keep spreading a little as the reader scrolls past. Everything is driven by one custom property,
// --deck (0 = stacked, 1 = the resting fan, up to 1.3 while scrolling through). No motion when the
// reader prefers reduced motion; without this script the CSS default (--deck: 1) shows the fan.
(() => {
  const deck = document.querySelector('.dsd-cards');
  if (!deck) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  const clamp = v => Math.min(1, Math.max(0, v));
  let live = false;
  let scheduled = false;

  function progress() {
    const r = deck.getBoundingClientRect();
    return clamp((innerHeight - r.top) / (innerHeight + r.height));
  }

  function paint() {
    scheduled = false;
    if (!live) return;
    deck.style.setProperty('--deck', String(1 + 0.3 * clamp((progress() - 0.3) / 0.7)));
  }

  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(paint);
    }
  }

  function enter() {
    deck.classList.add('is-entering');
    deck.style.setProperty('--deck', '1');
    setTimeout(() => {
      deck.classList.remove('is-entering');
      live = true;
      schedule();
    }, 1300);
  }

  deck.style.setProperty('--deck', '0');
  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        io.disconnect();
        enter();
      }
    }
  }, { threshold: 0.3 });
  io.observe(deck);

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  reduce.addEventListener('change', () => {
    if (reduce.matches) {
      live = false;
      deck.classList.remove('is-entering');
      deck.style.setProperty('--deck', '1');
    }
  });
})();
