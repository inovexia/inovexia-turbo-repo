// AUTO-GENERATED from INW_Variation_1/Light/index.html (inline script #1) by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
export default function run() {
  /* Our Apps: LMS / Accounting tabs. Self-contained. */
  (function () {
    var sec = document.getElementById('product');
    var tabs = sec ? sec.querySelectorAll('.apptabs [data-app]') : [];
    var strip = document.getElementById('appStrip');
    if (!tabs.length || !strip) return;
    function set(app) {
      Array.prototype.forEach.call(tabs, function (t) { t.setAttribute('aria-selected', String(t.getAttribute('data-app') === app)); });
      sec.querySelector('.apptabs').setAttribute('data-on', app);
      Array.prototype.forEach.call(sec.querySelectorAll('[data-app-pane]'), function (el) { el.hidden = el.getAttribute('data-app-pane') !== app; });
      // content that was hidden never scrolled into view, so reveal it now
      Array.prototype.forEach.call(sec.querySelectorAll('[data-app-pane="' + app + '"] .reveal, [data-app-pane="' + app + '"] [data-mask]'), function (el) { el.classList.add('is-in'); });
      strip.innerHTML = document.getElementById(app === 'acct' ? 'appTplAcct' : 'appTplLms').innerHTML;
      document.dispatchEvent(new CustomEvent('inovexia:app-swap'));
    }
    Array.prototype.forEach.call(tabs, function (t) {
      t.addEventListener('click', function () { if (t.getAttribute('aria-selected') !== 'true') set(t.getAttribute('data-app')); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        var other = tabs[t === tabs[0] ? 1 : 0]; other.focus(); other.click();
      });
    });
  })();
}
