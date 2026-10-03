// AUTO-GENERATED from INW_Variation_1/Light/service-web-design.html (inline script #1) by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
export default function run() {
  /* Related case studies slider. The progress line is the timer: it fills
     over DURATION while the slider is on screen and not hovered, and the
     next slide appears the moment it is full. Self-contained. */
  (function () {
    var root = document.getElementById('rcs'); if (!root) return;
    var track = root.querySelector('.rcs__track'), slides = root.querySelectorAll('.rcs__slide'), n = slides.length, idx = 0;
    var prog = root.querySelector('.rcs__prog i'), DURATION = 6000, elapsed = 0, last = null, paused = false, onScreen = false;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function go(i) {
      idx = (i + n) % n; elapsed = 0;
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      [].forEach.call(slides, function (s, k) { s.setAttribute('aria-hidden', String(k !== idx)); var c = s.querySelector('.rcs__cta'); if (c) c.tabIndex = k === idx ? 0 : -1; s.classList.toggle('is-on', k === idx); });
      [].forEach.call(root.querySelectorAll('.rcs__dots button'), function (d, k) { d.setAttribute('aria-current', String(k === idx)); });
      if (prog) prog.style.transform = 'scaleX(0)';
    }
    function tick() { var now = performance.now(), r = root.getBoundingClientRect(); onScreen = r.bottom > innerHeight * .2 && r.top < innerHeight * .8;
      if (last !== null && onScreen && !paused && !document.hidden) {
        elapsed += now - last;
        if (prog) prog.style.transform = 'scaleX(' + Math.min(elapsed / DURATION, 1).toFixed(4) + ')';
        if (elapsed >= DURATION) go(idx + 1);
      }
      last = now;
    }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-step],[data-go]'); if (!b) return; go(b.hasAttribute('data-go') ? +b.dataset.go : idx + +b.dataset.step); });
    root.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go(idx + 1); if (e.key === 'ArrowLeft') go(idx - 1); });
    root.addEventListener('pointerenter', function () { paused = true; }); root.addEventListener('pointerleave', function () { paused = false; });
    var x0 = null; track.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    track.addEventListener('pointerup', function (e) { if (x0 === null) return; var dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1)); });
    go(0);
    if (!reduced) setInterval(tick, 50); else if (prog) prog.parentNode.style.display = 'none';
  })();
}
