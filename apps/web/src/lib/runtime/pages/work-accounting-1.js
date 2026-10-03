// AUTO-GENERATED from INW_Variation_1/Light/work-accounting.html (inline script #1) by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
export default function run() {
  /* Product tour tabs. Self-contained. */
  (function () {
    var tabs = document.querySelectorAll('.wa-tour__tabs [role="tab"]');
    Array.prototype.forEach.call(tabs, function (t) {
      t.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (o) {
          var on = o === t;
          o.setAttribute('aria-selected', String(on));
          document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
        });
      });
    });
  })();
}
