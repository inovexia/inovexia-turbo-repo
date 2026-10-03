// AUTO-GENERATED from INW_Variation_1/Light/work-tonezone.html (inline script #2) by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
export default function run() {
  /* PageSpeed slider: switch, arrows, dots, keys and swipe. Inside each slide
     the report scrolls up and down with the mouse wheel. */
  (function () {
    var root = document.querySelector('.psx--slider'); if (!root) return;
    var track = root.querySelector('.psx__track'), cards = root.querySelectorAll('.psx__card');
    var idx = 0, n = cards.length;
    function go(i) {
      idx = Math.max(0, Math.min(n - 1, i));
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      root.querySelectorAll('.psx__dots [data-go]').forEach(function (b) { b.setAttribute('aria-current', String(+b.dataset.go === idx)); });
      var cnt = root.querySelector('.psx__count b'); if (cnt) cnt.textContent = '0' + (idx + 1);
      root.querySelector('[data-step="-1"]').disabled = idx === 0;
      root.querySelector('[data-step="1"]').disabled = idx === n - 1;
      cards.forEach(function (c, k) { c.setAttribute('aria-hidden', String(k !== idx)); c.querySelector('.psx__frame').tabIndex = k === idx ? 0 : -1; });
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go],[data-step]'); if (!b) return;
      go(b.hasAttribute('data-go') ? +b.dataset.go : idx + +b.dataset.step);
    });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') go(idx + 1); if (e.key === 'ArrowLeft') go(idx - 1);
    });
    var x0 = null;
    track.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    track.addEventListener('pointerup', function (e) { if (x0 === null) return; var dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1)); });
    root.querySelectorAll('.psx__scroll').forEach(function (s) { s.addEventListener('scroll', function () { s.parentNode.classList.toggle('is-end', s.scrollTop + s.clientHeight >= s.scrollHeight - 4); }, { passive: true }); });
    go(0);
  })();
}
