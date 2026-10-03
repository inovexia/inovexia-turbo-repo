// AUTO-GENERATED from INW_Variation_1/Light/work-tonezone.html (inline script #1) by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
export default function run() {
  /* keep the laptop and tablet on the same screen as the phone */
  (function () {
    var root = document.querySelector("#top > div.container:nth-of-type(3) > div.chero__grid > div.pd__vis.pd-slider.tzx.reveal.reveal--right:nth-of-type(2)"), ph = root.querySelectorAll('.pd-slide'), last = 0;
    var sets = [].map.call(root.querySelectorAll('.tzx__tablet .tzx__screen, .tzx__lid .tzx__screen'), function (s) { return s.querySelectorAll('.tzx-sync'); });
    function sync() {
      var i = 0; for (var k = 0; k < ph.length; k++) if (ph[k].classList.contains('is-active')) i = k;
      if (i === last) return;
      sets.forEach(function (set) { for (var j = 0; j < set.length; j++) { set[j].classList.toggle('is-active', j === i); set[j].classList.toggle('is-out', j === last && j !== i); } });
      last = i;
    }
    new MutationObserver(sync).observe(root.querySelector('.pd-slider__track'), { subtree: true, attributes: true, attributeFilter: ['class'] });
  })();
}
