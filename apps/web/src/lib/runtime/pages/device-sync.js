/* Case study banners (.tzx): main.js's .pd-slider drives the monitor and the
   phone; this keeps the laptop and tablet on the same screen as the phone.
   Shared by every case study that uses the device banner. */
export default function run() {
  document.querySelectorAll('.pd-slider.tzx').forEach(function (root) {
    var ph = root.querySelectorAll('.pd-slide'), last = 0;
    var sets = [].map.call(root.querySelectorAll('.tzx__tablet .tzx__screen, .tzx__lid .tzx__screen'), function (s) { return s.querySelectorAll('.tzx-sync'); });
    function sync() {
      var i = 0; for (var k = 0; k < ph.length; k++) if (ph[k].classList.contains('is-active')) i = k;
      if (i === last) return;
      sets.forEach(function (set) { for (var j = 0; j < set.length; j++) { set[j].classList.toggle('is-active', j === i); set[j].classList.toggle('is-out', j === last && j !== i); } });
      last = i;
    }
    new MutationObserver(sync).observe(root.querySelector('.pd-slider__track'), { subtree: true, attributes: true, attributeFilter: ['class'] });
  });
}
