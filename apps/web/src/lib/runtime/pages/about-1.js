// From INW_Variation_1/Light/about.html (inline script #1), hand-edited: the CV
// form now uploads to /api/careers. The converter no longer overwrites it.
import { setBusy, submitForm } from '../api';

export default function run() {
  /* CV pop-up: open/close, drag-and-drop, validation. Self-contained. */
  (function () {
    var dlg = document.getElementById('cvModal');
    if (!dlg || typeof dlg.showModal !== 'function') return;   // very old browsers keep the page as is
    var form = document.getElementById('cvForm');
    var name = document.getElementById('cvName'), email = document.getElementById('cvEmail');
    var file = document.getElementById('cvFile'), drop = document.getElementById('cvDrop');
    var fileName = document.getElementById('cvFileName'), msg = document.getElementById('cvMsg');
    var MAX = 5 * 1024 * 1024, OK = /\.(pdf|docx?)$/i;

    function setErr(input, id, text) {
      input.setAttribute('aria-invalid', text ? 'true' : 'false');
      document.getElementById(id).textContent = text || '';
      if (input === file) drop.classList.toggle('is-bad', !!text);
    }
    function fileProblem(f) {
      if (!f) return 'Please attach your CV.';
      if (!OK.test(f.name)) return 'Please upload a PDF or Word file.';
      if (f.size > MAX) return 'That file is over 5 MB. Please upload a smaller one.';
      return '';
    }
    function showFile() {
      var f = file.files[0];
      fileName.textContent = f ? f.name : 'Browse file';
      drop.classList.toggle('has-file', !!f);
      setErr(file, 'cvFileErr', f ? fileProblem(f) : '');
    }

    document.querySelectorAll('[data-cv-open]').forEach(function (b) {
      b.addEventListener('click', function () {
        msg.textContent = ''; msg.classList.remove('is-error');
        dlg.showModal(); document.body.classList.add('is-locked');
        name.focus();
      });
    });
    dlg.addEventListener('close', function () { document.body.classList.remove('is-locked'); });
    dlg.querySelector('[data-cv-close]').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });   // backdrop

    file.addEventListener('change', showFile);
    ['dragenter', 'dragover'].forEach(function (t) {
      drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add('is-over'); });
    });
    ['dragleave', 'drop'].forEach(function (t) {
      drop.addEventListener(t, function () { drop.classList.remove('is-over'); });
    });
    drop.addEventListener('drop', function (e) {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files.length) { file.files = e.dataTransfer.files; showFile(); }
    });
    name.addEventListener('input', function () { setErr(name, 'cvNameErr', ''); });
    email.addEventListener('input', function () { setErr(email, 'cvEmailErr', ''); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = name.value.trim(), m = email.value.trim(), f = file.files[0];
      var nErr = n.length > 1 ? '' : 'Please tell us your name.';
      var mErr = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(m) ? '' : 'Please enter a valid email address.';
      var fErr = fileProblem(f);
      setErr(name, 'cvNameErr', nErr); setErr(email, 'cvEmailErr', mErr); setErr(file, 'cvFileErr', fErr);
      if (nErr || mErr || fErr) {
        msg.classList.add('is-error'); msg.textContent = 'Please check the highlighted fields.';
        (nErr ? name : mErr ? email : drop).focus();
        return;
      }
      var data = new FormData();
      data.append('name', n); data.append('email', m); data.append('cv', f, f.name);
      setBusy(form, true);
      submitForm('/api/careers', data).then(function (res) {
        setBusy(form, false);
        if (!res.ok) {
          var e = res.fields;
          if (e.name) setErr(name, 'cvNameErr', e.name);
          if (e.email) setErr(email, 'cvEmailErr', e.email);
          if (e.cv) setErr(file, 'cvFileErr', e.cv);
          msg.classList.add('is-error'); msg.textContent = res.error;
          return;
        }
        msg.classList.remove('is-error');
        msg.textContent = 'Thanks, ' + n.split(' ')[0] + '! Your CV has been sent. We will be in touch.';
        form.reset(); showFile();
      });
    });
  })();
}
