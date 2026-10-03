// From INW_Variation_1/Light/get-in-touch.html (inline script #1), hand-edited:
// the form now posts to /api/enquiries. The converter no longer overwrites it.
import { setBusy, submitForm } from '../api';

export default function run() {
  /* Get in Touch form: validation and a self-made captcha. The captcha is a
     browser-side speed bump; the API re-validates every field and drops
     submissions that fill the hidden honeypot. */
  (function () {
    var form = document.getElementById('gitForm');
    if (!form) return;
    var cv = document.getElementById('gitCaptchaImg'), ctx = cv.getContext('2d');
    var msg = document.getElementById('gitMsg'), answer = 0;

    function newSum() {
      var a = 2 + Math.floor(Math.random() * 12), b = 1 + Math.floor(Math.random() * 9);
      answer = a + b;
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = dark ? '#151833' : '#eef0f8'; ctx.fillRect(0, 0, cv.width, cv.height);
      for (var i = 0; i < 6; i++) {           // noise lines
        ctx.strokeStyle = 'rgba(109, 94, 252, ' + (0.18 + Math.random() * 0.2) + ')';
        ctx.beginPath(); ctx.moveTo(Math.random() * cv.width, Math.random() * cv.height);
        ctx.lineTo(Math.random() * cv.width, Math.random() * cv.height); ctx.stroke();
      }
      var text = a + ' + ' + b + ' = ?', x = 16;
      ctx.font = '700 22px Sora, Segoe UI, sans-serif'; ctx.textBaseline = 'middle';
      for (var j = 0; j < text.length; j++) {  // each character slightly tilted
        ctx.save(); ctx.translate(x, cv.height / 2 + (Math.random() * 6 - 3)); ctx.rotate((Math.random() - 0.5) * 0.35);
        ctx.fillStyle = dark ? '#e9ecf7' : '#0a1030'; ctx.fillText(text[j], 0, 0); ctx.restore();
        x += text[j] === ' ' ? 7 : ctx.measureText(text[j]).width + 2;
      }
      cv.setAttribute('aria-label', 'Captcha: what is ' + a + ' plus ' + b + '?');
    }
    newSum();
    document.getElementById('gitCaptchaNew').addEventListener('click', function () { newSum(); document.getElementById('gitCaptcha').value = ''; });
    document.addEventListener('inovexia:theme', newSum);

    var rules = [
      ['gitName', function (v) { return v.length > 1; }, 'Please tell us your name.'],
      ['gitEmail', function (v) { return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v); }, 'Please enter a valid email address.'],
      ['gitMobile', function (v) { return v === '' || v.replace(/\D/g, '').length >= 8 && /^[+\d\s()-]+$/.test(v); }, 'Please enter a valid mobile number.'],
      ['gitService', function (v) { return v !== ''; }, 'Please choose what we can help you with.'],
      ['gitDetails', function (v) { return v.length > 9; }, 'A sentence or two about what you need helps us reply usefully.'],
      ['gitCaptcha', function (v) { return v !== '' && +v === answer; }, 'That answer is not right. Please try the sum again.']
    ];
    function mark(id, ok, text) {
      var el = document.getElementById(id);
      el.setAttribute('aria-invalid', String(!ok));
      document.getElementById(id + 'Err').textContent = ok ? '' : text;
    }
    rules.forEach(function (r) {
      var el = document.getElementById(r[0]); el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', function () { mark(r[0], true); msg.textContent = ''; msg.classList.remove('is-error'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (document.getElementById('gitWebsite').value) return;   // bot: stay silent
      var first = null;
      rules.forEach(function (r) {
        var el = document.getElementById(r[0]), ok = r[1]((el.value || '').trim());
        mark(r[0], ok, r[2]); if (!ok && !first) first = el;
      });
      if (first) {
        if (first.id === 'gitCaptcha') { newSum(); first.value = ''; }
        msg.classList.add('is-error'); msg.textContent = 'Please check the highlighted fields.'; first.focus(); return;
      }
      var val = function (id) { return document.getElementById(id).value; };
      setBusy(form, true);
      submitForm('/api/enquiries', {
        type: 'quote',
        name: val('gitName'), email: val('gitEmail'), mobile: val('gitMobile'), company: val('gitCompany'),
        service: val('gitService'), details: val('gitDetails'), website: val('gitWebsite')
      }).then(function (res) {
        setBusy(form, false);
        if (!res.ok) {
          var ids = { name: 'gitName', email: 'gitEmail', mobile: 'gitMobile', service: 'gitService', details: 'gitDetails' };
          var bad = Object.keys(res.fields).filter(function (k) { return ids[k]; });
          bad.forEach(function (k) { mark(ids[k], false, res.fields[k]); });
          msg.classList.add('is-error'); msg.textContent = res.error;
          if (bad.length) document.getElementById(ids[bad[0]]).focus();
          newSum(); document.getElementById('gitCaptcha').value = '';
          return;
        }
        msg.classList.remove('is-error');
        msg.textContent = 'Thanks! We\u2019ll be in touch within one business day.';
        form.reset(); newSum();
      });
    });
  })();
}
