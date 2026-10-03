/* Ported from INW_Variation_1/Light/assets/js/main.js — the design's shared
   UI script, unchanged except where marked "[next]". It is called once per page
   load by <SiteRuntime> (internal links are plain <a>, so every navigation is a
   full load, exactly as on the static site). Each block is guarded on the
   elements it needs, so pages only pay for what they render. */
import { setBusy, submitForm } from './api';

export default function initSite() {
  /* =========================================================
     Inovexia — Variation 1 (Light) · UI interactions

     intro curtain · theme · header · mobile nav · scroll reveal
     · line-mask text · phrase rotator · counters · 3D tilt ·
     magnetic buttons · blend cursor with labels · tabs ·
     scroll-velocity marquee · pinned horizontal process track ·
     app screen slider · insights list with cursor-following preview ·
     parallax · form · to-top
     ========================================================= */
  (function () {
    'use strict';

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* Pointer-follow effects (custom cursor, magnetic buttons, 3D tilt, cursor-
       following preview) are switched off: they distracted from the content.
       Set back to the matchMedia test to restore them. */
    var finePtr = false;
    var small   = window.matchMedia('(max-width: 900px)');
    /* must match the .pstage media query in style.css — the App section is
       only pinned (and only scroll-driven) where that query applies */
    var pinnable = window.matchMedia('(min-width: 1081px) and (min-height: 760px)');
    var $  = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var clamp01 = function (n) { return n < 0 ? 0 : n > 1 ? 1 : n; };
    var lerp = function (a, b, t) { return a + (b - a) * t; };

    /* ---------- Intro curtain ----------
       Counts to 100, then lifts as a clip-path wipe. The reveal observer is
       started as the curtain begins to move, so the hero animates in behind it
       rather than after it — the page is already alive when you first see it. */
    (function () {
      var intro = $('#intro');
      var num   = $('#introNum');
      var bar   = $('#introBar');
      if (!intro) return;

      if (reduced) { intro.classList.add('is-gone'); return; }

      document.body.classList.add('is-booting');

      var start = null, done = false;
      var DURATION = 1250;

      function finish() {
        if (done) return;
        done = true;
        intro.classList.add('is-out');
        document.body.classList.remove('is-booting');
        // starts the reveal pass while the curtain is still lifting, so the hero
        // animates into view rather than being already finished behind it
        document.dispatchEvent(new CustomEvent('inovexia:ready'));
        setTimeout(function () { intro.classList.add('is-gone'); }, 1150);
      }

      function step(now) {
        if (start === null) start = now;
        var p = Math.min((now - start) / DURATION, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        if (num) num.textContent = Math.round(eased * 100);
        if (bar) bar.style.width = (eased * 100) + '%';
        if (p < 1) { requestAnimationFrame(step); return; }
        setTimeout(finish, 180);
      }
      requestAnimationFrame(step);

      setTimeout(finish, 4200);   // never trap the page on a slow asset
    })();

    /* ---------- Theme ---------- */
    var root   = document.documentElement;
    var toggle = $('#themeToggle');
    var KEY    = 'inovexia-theme';   // [next] must match the pre-paint script in app/layout.jsx

    function applyTheme(next) {
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'light' ? '#f5f6fb' : '#05060f');
      document.dispatchEvent(new CustomEvent('inovexia:theme', { detail: { theme: next } }));
    }
    if (toggle) {
      toggle.addEventListener('click', function () {
        applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
      });
    }

    /* ---------- Scroll driver ---------- */
    var header   = $('#header');
    var progress = $('#scrollProgress');
    var toTop    = $('#toTop');
    var lastY = window.pageYOffset || 0;
    var velocity = 0;

    function onScroll() {
      var y   = window.pageYOffset || root.scrollTop;
      var max = root.scrollHeight - window.innerHeight;

      velocity = y - lastY;
      lastY = y;

      if (header)   header.classList.toggle('is-stuck', y > 24);
      if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      if (toTop)    toTop.classList.toggle('is-visible', y > window.innerHeight * 0.85);

      heroParallax(y);
      layerParallax();
      runDrift();
      runEdge();
      runTrack();
      runShots();
      runTimeline();
      runSvcx();
      runLegal();
      activeNav();
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', onScroll);

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Mobile navigation ---------- */
    var burger = $('#burger');
    var nav    = $('#nav');

    function setNav(open) {
      if (!nav || !burger) return;
      nav.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('is-locked', open);
    }
    if (burger) burger.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });

    /* The drawer's own header: a "Menu" label and a close button. Built here so
       every page gets it without touching the markup. */
    if (nav && burger && !$('.nav__head', nav)) {
      var navHead = document.createElement('div');
      navHead.className = 'nav__head';
      navHead.innerHTML = '<span class="nav__title">Menu</span>' +
        '<button type="button" class="nav__close" aria-label="Close menu">' +
        '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg></button>';
      nav.insertBefore(navHead, nav.firstChild);
      $('.nav__close', navHead).addEventListener('click', function () { setNav(false); burger.focus(); });
    }
    $$('.nav__link, .nav__cta a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
    window.addEventListener('click', function (e) {
      if (!nav || !nav.classList.contains('is-open')) return;
      if (!nav.contains(e.target) && !burger.contains(e.target)) setNav(false);
    });

    /* ---------- Scroll reveal (fades, line masks and clip wipes) ----------
       Observation is deliberately deferred until the curtain starts lifting.
       An IntersectionObserver fires immediately for anything already in view,
       so wiring it up at parse time would run the whole hero sequence behind
       the curtain and leave a static page waiting when it opened. */
    var revealables = $$('.reveal, [data-mask], .wipe, .story__rule');

    /* Staggered groups: number the revealable children of any [data-stagger]
       container so the entrance delay comes from position instead of a
       hand-written data-delay on every item. An explicit data-delay wins. */
    $$('[data-stagger]').forEach(function (group) {
      $$('.reveal', group).forEach(function (el, i) {
        if (!el.hasAttribute('data-delay')) el.style.setProperty('--d', i);
      });
    });

    function startReveals() {
      if (reduced || !('IntersectionObserver' in window)) {
        revealables.forEach(function (el) { el.classList.add('is-in'); });
        return;
      }
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealables.forEach(function (el) { revealObserver.observe(el); });
    }

    /* Whichever comes first: the curtain finishing, or a hard 1.6s deadline.
       The deadline matters — the curtain's counter runs on requestAnimationFrame,
       and rAF is throttled to a standstill in a background tab, in low-power
       mode and in headless rendering. Without this the whole page sits at
       opacity 0 until the curtain's own 4.2s bail-out fires. */
    var revealsStarted = false;
    function startRevealsOnce() {
      if (revealsStarted) return;
      revealsStarted = true;
      startReveals();
    }

    if (reduced || !$('#intro')) {
      startRevealsOnce();
    } else {
      document.addEventListener('inovexia:ready', startRevealsOnce);
      setTimeout(startRevealsOnce, 1600);
    }

    /* ---------- Hero: 3D flipping word rotator ---------- */
    (function () {
      var rotator = $('#heroRotator');
      if (!rotator) return;

      var stage = $('.rotator__stage', rotator);
      var bar   = $('.rotator__bar', rotator);
      var items = $$('.rotator__item', rotator);
      if (items.length < 2) return;

      var index = 0;
      items[0].style.position = 'absolute';   // JS now owns the stage width

      function sizeTo(el) {
        var w = Math.ceil(el.getBoundingClientRect().width);
        if (!w) return;
        stage.style.width = w + 'px';
        if (bar) bar.style.width = w + 'px';
      }
      function measure() { sizeTo(items[index]); }

      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      measure();
      window.addEventListener('resize', measure);

      if (reduced) return;

      var timer = setInterval(function () {
        if (document.hidden) return;
        var current = items[index];
        index = (index + 1) % items.length;
        var next = items[index];

        current.classList.remove('is-active');
        current.classList.add('is-out');
        next.classList.remove('is-out');
        next.classList.add('is-active');
        sizeTo(next);

        setTimeout(function () { current.classList.remove('is-out'); }, 800);
      }, 2800);

      window.addEventListener('pagehide', function () { clearInterval(timer); });
    })();

    /* ---------- Hero: constellation tilt ---------- */
    var stackMap = $('#stackMap');
    if (stackMap && finePtr && !reduced) {
      stackMap.addEventListener('pointermove', function (e) {
        var r  = stackMap.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width  - 0.5;
        var py = (e.clientY - r.top)  / r.height - 0.5;
        stackMap.style.transform = 'rotateY(' + (px * 13).toFixed(2) + 'deg) rotateX(' +
                                   (-py * 10).toFixed(2) + 'deg)';
      }, { passive: true });
      stackMap.addEventListener('pointerleave', function () { stackMap.style.transform = ''; });
    }

    /* ---------- Hero: content parallax ---------- */
    var heroCopy = $('.hero__copy');
    function heroParallax(y) {
      if (!heroCopy || reduced) return;
      var vh = window.innerHeight;
      if (y > vh) return;
      heroCopy.style.transform = 'translateY(' + (y * 0.16).toFixed(1) + 'px)';
      heroCopy.style.opacity = Math.max(0, 1 - y / (vh * 0.78)).toFixed(3);
    }

    /* ---------- Decorative parallax layers ----------
       Only applied to elements that carry no other transform, so nothing here
       fights a hover rule. */
    var layers = $$('[data-parallax]');
    function layerParallax() {
      if (reduced || !layers.length) return;
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) return;
        var factor = parseFloat(el.getAttribute('data-parallax')) || 0;
        var offset = (r.top + r.height / 2 - vh / 2) * factor;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
    }

    /* ---------- Animated counters ---------- */
    function runCounter(el) {
      var target   = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix   = el.getAttribute('data-suffix') || '';
      var decimals = (String(target).split('.')[1] || '').length;
      var start    = null;

      if (reduced) { el.textContent = target.toFixed(decimals) + suffix; return; }

      function step(now) {
        if (start === null) start = now;
        var p = Math.min((now - start) / 1500, 1);
        el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var counters = $$('.count');
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCounter);
    } else {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          countObserver.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { countObserver.observe(el); });
    }

    /* ---------- 3D tilt cards + cursor spotlight ---------- */
    $$('.tilt').forEach(function (card) {
      if (!finePtr) return;
      var rect = null;

      function enter() { rect = card.getBoundingClientRect(); }
      function move(e) {
        if (!rect) rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
        if (reduced) return;
        card.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 9).toFixed(2) +
                               'deg) rotateY(' + ((px - 0.5) * 11).toFixed(2) + 'deg) translateY(-6px)';
      }
      function leave() { rect = null; card.style.transform = ''; }

      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
    });

    /* ---------- Magnetic buttons ---------- */
    if (finePtr && !reduced) {
      $$('.magnetic').forEach(function (btn) {
        btn.addEventListener('pointermove', function (e) {
          var r = btn.getBoundingClientRect();
          var x = e.clientX - r.left - r.width / 2;
          var y = e.clientY - r.top - r.height / 2;
          btn.style.transform = 'translate(' + (x * 0.18).toFixed(2) + 'px,' + (y * 0.26).toFixed(2) + 'px)';
        });
        btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
      });
    }

    /* ---------- Cursor: blend-mode ring with contextual labels ---------- */
    var cursor = $('#cursor');
    if (cursor && finePtr && !reduced) {
      var label = $('#cursorLabel');
      var cx = 0, cy = 0, tx = 0, ty = 0, on = false;

      window.addEventListener('pointermove', function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!on) { cx = tx; cy = ty; on = true; cursor.classList.add('is-active'); }
      }, { passive: true });

      (function loop() {
        cx = lerp(cx, tx, 0.2);
        cy = lerp(cy, ty, 0.2);
        cursor.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
        requestAnimationFrame(loop);
      })();

      var HOVERABLE = 'a, button, .card, .tab, .chips li, input, .node, .pstep';

      document.addEventListener('pointerover', function (e) {
        if (!e.target.closest) return;
        var labelled = e.target.closest('[data-cursor]');
        if (labelled) {
          if (label) label.textContent = labelled.getAttribute('data-cursor');
          cursor.classList.add('is-label');
          return;
        }
        if (e.target.closest(HOVERABLE)) cursor.classList.add('is-hover');
      });

      document.addEventListener('pointerout', function (e) {
        if (!e.target.closest) return;
        if (e.target.closest('[data-cursor]')) cursor.classList.remove('is-label');
        if (e.target.closest(HOVERABLE)) cursor.classList.remove('is-hover');
      });
    } else if (cursor) {
      cursor.remove();
    }

    /* ---------- Services: columns drift past each other ----------
       Each column is offset by its own multiple of the section's scroll
       progress, so the three tracks separate and re-converge as you pass. */
    var drift     = $('#drift');
    var driftCols = $$('.drift__col');

    function runDrift() {
      if (!drift || reduced || small.matches) return;
      var r  = drift.getBoundingClientRect();
      var vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      // -1 above the fold, 0 centred, +1 below
      var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      driftCols.forEach(function (col) {
        var amount = parseFloat(col.getAttribute('data-drift')) || 0;
        col.style.transform = 'translate3d(0,' + (p * amount).toFixed(1) + 'px,0)';
      });
    }


    /* ---------- Why us: the item nearest the viewport centre takes focus ---------- */
    var edgeItems = $$('.ed');
    var edgeNum   = $('#edgeNum');

    function runEdge() {
      if (!edgeItems.length) return;
      if (reduced || small.matches) {
        edgeItems.forEach(function (el) { el.classList.add('is-live'); });
        return;
      }
      var mid = window.innerHeight * 0.48;
      var best = null, bestDist = Infinity;

      edgeItems.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) { bestDist = d; best = el; }
      });

      edgeItems.forEach(function (el, i) {
        var on = el === best;
        el.classList.toggle('is-live', on);
        if (on && edgeNum) edgeNum.textContent = ('0' + (i + 1)).slice(-2);
      });
    }

    /* ---------- Marquee driven by scroll velocity ----------
       Base drift continues on its own; scrolling speeds it up, skews it and
       flips its direction. Position is integrated by hand rather than left to
       a CSS animation, so the two can't fight over the same transform. */
    (function () {
      var track = $('#marqueeTrack');
      if (!track || reduced) return;

      track.style.animation = 'none';
      var width = 0, x = 0;

      function measure() { width = track.scrollWidth / 2; }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      measure();
      window.addEventListener('resize', measure);

      (function tick() {
        requestAnimationFrame(tick);
        if (!width) { measure(); return; }

        var v = velocity;
        var dir = v < -0.5 ? -1 : 1;                 // scrolling up reverses it
        var speed = 0.6 + Math.min(Math.abs(v) * 0.22, 9);

        x -= dir * speed;
        if (x <= -width) x += width;
        if (x >= 0) x -= width;

        var skew = Math.max(-9, Math.min(9, v * 0.32));
        track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) skewX(' + skew.toFixed(2) + 'deg)';

        velocity *= 0.9;                             // decay between scroll events
      })();
    })();

    /* ---------- Process: pinned horizontal track ---------- */
    var track  = $('#track');
    var rail   = $('#trackRail');
    var meter  = $('#trackMeter');

    function runTrack() {
      if (!track || !rail) return;
      if (small.matches || reduced) { rail.style.transform = ''; return; }

      var r     = track.getBoundingClientRect();
      var vh    = window.innerHeight;
      var total = track.offsetHeight - vh;
      if (total <= 0) return;

      var p    = clamp01(-r.top / total);
      var dist = Math.max(0, rail.scrollWidth - window.innerWidth + 40);

      rail.style.transform = 'translate3d(' + (-p * dist).toFixed(1) + 'px,0,0)';
      if (meter) meter.style.width = (p * 100) + '%';
    }

    /* ---------- Insights: preview that follows the cursor ---------- */
    (function () {
      var feed = $('#feed');
      var peek = $('#peek');
      if (!feed || !peek || !finePtr || reduced) { if (peek) peek.remove(); return; }

      var cards = $$('.peek__c', peek);
      var px = 0, py = 0, tx = 0, ty = 0, live = false;

      $$('.feed__row', feed).forEach(function (row) {
        var id = row.getAttribute('data-peek');
        row.addEventListener('pointerenter', function () {
          live = true;
          peek.classList.add('is-on');
          cards.forEach(function (c) { c.classList.toggle('is-on', c.getAttribute('data-peek') === id); });
        });
        row.addEventListener('pointerleave', function () {
          live = false;
          peek.classList.remove('is-on');
        });
      });

      window.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });

      (function loop() {
        requestAnimationFrame(loop);
        if (!live) return;
        px = lerp(px, tx, 0.12);
        py = lerp(py, ty, 0.12);
        peek.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0)';
      })();
    })();

    /* ---------- App section: phone screens scroll with the page ----------
       The five screens are one tall strip inside the phone. Where the section
       is pinned (see .pstage), scroll position picks a point on that strip:
       each screen holds for the first 30% of its share of the scroll, then
       glides to the next, so the phone never rests between two screens. Where
       it is not pinned, the phone steps through the screens on a timer while
       it is on screen. Either way the strip eases toward its target on every
       frame instead of jumping with the scroll events. */
    var appStage = $('#appStage');
    var appTarget = null;    // runShots sets this; null until the phone is up
    var appCount  = 0;

    (function () {
      var strip = $('#appStrip');
      if (!strip) return;

      var win   = strip.parentElement;
      var shots = $$('img', strip);
      var N     = shots.length;
      var box   = $('#appx');
      var web   = $('.appx__web', box);
      var num   = $('#appNum');
      var cap   = $('#appCap');
      var prog  = $('#appProg');
      var steps = $$('.appf[data-screen]');

      var cur = 0, target = 0, shown = -1, running = false;
      var onScreen = false, hovering = false, timer = null, held = 0;

      function mark(i) {
        if (i === shown) return;
        shown = i;
        steps.forEach(function (st) { st.classList.toggle('is-on', +st.getAttribute('data-screen') === i); });
        if (num) num.textContent = (i < 9 ? '0' : '') + (i + 1);
        if (cap) cap.textContent = shots[i].getAttribute('data-cap') || '';
      }

      function paint() {
        var span = N > 1 ? cur / (N - 1) : 0;
        strip.style.transform = 'translate3d(0,' + (-cur * win.clientHeight).toFixed(1) + 'px,0)';
        if (web)  web.style.setProperty('--wy', span.toFixed(4));
        if (prog) prog.style.transform = 'scaleX(' + span.toFixed(4) + ')';
        mark(Math.round(cur));
      }

      function tick() {
        var d = target - cur;
        if (Math.abs(d) < 0.001) { cur = target; paint(); running = false; return; }
        cur += d * 0.12;
        paint();
        requestAnimationFrame(tick);
      }

      function go(pos, instant) {
        target = Math.max(0, Math.min(N - 1, pos));
        if (instant || reduced) { cur = target; paint(); return; }
        if (!running) { running = true; requestAnimationFrame(tick); }
      }
      appTarget = go;
      appCount  = N;

      // LMS / Accounting tabs replace the strip's screens: re-read them and start over
      document.addEventListener('inovexia:app-swap', function () {
        shots = $$('img', strip);
        N = shots.length;
        steps = $$('.appf[data-screen]');
        appCount = N;
        shown = -1;
        var total = $('#appTotal');
        if (total) total.textContent = (N < 10 ? '0' : '') + N;
        go(0, true);
        runShots();
      });

      // unpinned: step on a timer, only while visible, idle and not held by a click
      function autoplay() {
        if (timer || reduced || pinnable.matches) return;
        timer = setInterval(function () {
          if (document.hidden || !onScreen || hovering || Date.now() < held) return;
          go(Math.round(target) + 1 >= N ? 0 : Math.round(target) + 1);
        }, 3400);
      }
      function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

      // a feature item takes the phone to its screen — by scrolling the page
      // when pinned (so scroll and phone stay in step), directly otherwise
      steps.forEach(function (st) {
        st.addEventListener('click', function () {
          var i = +st.getAttribute('data-screen');
          if (pinnable.matches && !reduced && appStage) {
            var total = appStage.offsetHeight - window.innerHeight;
            var top = appStage.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top + total * (i / (N - 1)), behavior: 'smooth' });
          } else {
            held = Date.now() + 8000;
            go(i);
          }
        });
      });

      // pointer tilt: the phone and the window lean at different depths
      if (box && finePtr && !reduced) {
        box.addEventListener('pointermove', function (e) {
          var r = box.getBoundingClientRect();
          box.style.setProperty('--ry', (((e.clientX - r.left) / r.width) - 0.5).toFixed(3));
          box.style.setProperty('--rx', (((e.clientY - r.top) / r.height) - 0.5).toFixed(3));
        });
        box.addEventListener('pointerleave', function () {
          box.style.setProperty('--rx', 0);
          box.style.setProperty('--ry', 0);
        });
      }
      if (box) {
        box.addEventListener('pointerenter', function () { hovering = true; });
        box.addEventListener('pointerleave', function () { hovering = false; });
      }

      if ('IntersectionObserver' in window && box) {
        new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; },
          { threshold: 0.3 }).observe(box);
      } else {
        onScreen = true;
      }

      window.addEventListener('resize', paint);
      if (pinnable.addEventListener) {
        pinnable.addEventListener('change', function () { stopAuto(); autoplay(); runShots(); });
      }
      window.addEventListener('pagehide', stopAuto);

      go(0, true);
      autoplay();
    })();

    function runShots() {
      if (!appStage || !appTarget) return;
      if (reduced || !pinnable.matches) return;

      var total = appStage.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      var p    = clamp01(-appStage.getBoundingClientRect().top / total);
      var last = appCount - 1;
      var raw  = p * last;                               // one move between each pair of screens
      var k    = Math.min(last - 1, Math.floor(raw));
      var f    = clamp01((raw - k - 0.3) / 0.7);         // hold, then move
      var ease = f * f * (3 - 2 * f);                    // smoothstep
      appTarget(p >= 1 ? last : k + ease);
    }

    /* ---------- About page: timeline rail fills as you scroll ----------
       Only about.html renders #tl; on the homepage this is a no-op. */
    var tl     = $('#tl');
    var tlFill = $('#tlFill');

    function runTimeline() {
      if (!tl || !tlFill) return;
      var r    = tl.getBoundingClientRect();
      var vh   = window.innerHeight;
      var span = r.height + vh * 0.35;
      var p    = (vh * 0.65 - r.top) / span;
      tlFill.style.height = (clamp01(p) * 100) + '%';
    }

    /* ---------- Services page: sticky index follows the cards ----------
       Whichever card sits nearest the middle of the viewport is the live one;
       its index entry lights and its top rule draws. Only services.html
       renders .srv, so this is a no-op everywhere else. */
    var svcCards = $$('.srv');
    var svcLinks = $$('.svcx__index a');

    function runSvcx() {
      if (!svcCards.length) return;
      var mid = window.innerHeight * 0.42;
      var best = null, bestDist = Infinity;

      svcCards.forEach(function (card) {
        var r = card.getBoundingClientRect();
        var d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) { bestDist = d; best = card; }
      });
      if (!best) return;

      svcCards.forEach(function (c) { c.classList.toggle('is-live', c === best); });
      svcLinks.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('href') === '#' + best.id); });
    }

    /* ---------- Legal pages: contents index follows the reading position ----------
       Whichever section has passed the top third of the viewport is the live
       one: its entry in the index lights, its numeral fills and its rule draws.
       The rail beside the index fills with how far through the article you are,
       which is a truer progress bar than the header's — that one measures the
       whole document, footer included. Only terms.html renders .lsec, so this
       is a no-op everywhere else. */
    var legalSecs  = $$('.lsec');
    var legalLinks = $$('.ltoc a');
    var legalFill  = $('#ltocFill');

    function runLegal() {
      if (!legalSecs.length) return;
      var mark = window.innerHeight * 0.32;
      var live = legalSecs[0];

      legalSecs.forEach(function (s) {
        if (s.getBoundingClientRect().top <= mark) live = s;
      });
      legalSecs.forEach(function (s) { s.classList.toggle('is-live', s === live); });
      legalLinks.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('href') === '#' + live.id); });

      if (legalFill) {
        var first = legalSecs[0].getBoundingClientRect();
        var last  = legalSecs[legalSecs.length - 1].getBoundingClientRect();
        var span  = (last.bottom - first.top) || 1;
        legalFill.style.height = (clamp01((mark - first.top) / span) * 100) + '%';
      }
    }

    /* ---------- Work page: category filter ----------
       Three things happen on a click: the highlight slides to the new button
       (CSS transitions --x / --w, which is why the bar has one moving element
       rather than a background per button), the grid hides what does not match,
       and the entrance animation replays across whatever is left.

       The replay needs the reflow: removing and re-adding a class in the same
       frame is coalesced, so the animation never restarts. Reading offsetWidth
       in between forces the style to flush. Guarded on #wkbar, so only
       work.html pays for any of it. */
    (function () {
      var bar = $('#wkbar');
      if (!bar) return;

      var btns  = $$('.wkbar__btn', bar);
      var ink   = $('.wkbar__ink', bar);
      var grid  = $('#wkgrid');
      var empty = $('#wkempty');
      var items = grid ? $$('.work__item', grid) : [];
      if (!btns.length || !items.length) return;

      function matches(item, cat) {
        return cat === 'all' || (' ' + item.getAttribute('data-cat') + ' ').indexOf(' ' + cat + ' ') > -1;
      }

      /* Counts come from the markup rather than being typed into it, so a
         project added later cannot leave the tabs lying. */
      btns.forEach(function (b) {
        var slot = $('.wkbar__n', b);
        if (!slot) return;
        var cat = b.getAttribute('data-filter');
        slot.textContent = items.filter(function (i) { return matches(i, cat); }).length;
      });

      function moveInk(btn) {
        if (!ink) return;
        ink.style.setProperty('--x', (btn.offsetLeft - bar.clientLeft) + 'px');
        ink.style.setProperty('--w', btn.offsetWidth + 'px');
      }

      function apply(cat, replay) {
        var shown = 0;
        items.forEach(function (item) {
          var on = matches(item, cat);
          if (on) { item.removeAttribute('hidden'); item.style.setProperty('--d', shown++); }
          else    { item.setAttribute('hidden', ''); }
        });
        if (empty) empty.toggleAttribute('hidden', shown > 0);

        if (replay && grid && !reduced) {
          grid.classList.remove('is-filtering');
          void grid.offsetWidth;                    // flush, or the replay is dropped
          grid.classList.add('is-filtering');
        }
      }

      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
          moveInk(btn);
          apply(btn.getAttribute('data-filter'), true);
        });
      });

      var initial = btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || btns[0];
      initial.setAttribute('aria-pressed', 'true');
      apply(initial.getAttribute('data-filter'), false);

      /* The bar is laid out in web fonts; measuring before they land puts the
         highlight under the wrong button and leaves it there. */
      function place() { moveInk($('.wkbar__btn[aria-pressed="true"]', bar) || btns[0]); }
      place();
      window.addEventListener('resize', place);
      window.addEventListener('load', place);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    })();

    /* ---------- Article page: recent-posts slider ----------
       The track is a scroll-snap row, so it already works with a trackpad, a
       touch drag and the keyboard before any of this runs — the buttons only
       add a click target, and they page by one card plus its gap rather than by
       a guessed pixel amount. Guarded on #rsl, so only the article pays. */
    (function () {
      var rsl = $('#rsl');
      if (!rsl) return;

      var track = $('.rsl__track', rsl);
      var prev  = $('#rslPrev');
      var next  = $('#rslNext');
      if (!track || !prev || !next) return;

      function step() {
        var card = track.firstElementChild;
        if (!card) return track.clientWidth;
        var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return card.getBoundingClientRect().width + gap;
      }

      /* A 1px tolerance: scrollLeft is fractional on zoomed or scaled displays,
         and without it the end button never quite disables. */
      function sync() {
        var max = track.scrollWidth - track.clientWidth;
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft >= max - 1;
      }

      prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }); });
      next.addEventListener('click', function () { track.scrollBy({ left:  step(), behavior: reduced ? 'auto' : 'smooth' }); });
      track.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    })();

    /* ---------- Contact page: FAQ accordion ----------
       One open at a time. The panel animates on grid-template-rows 0fr -> 1fr,
       which lets the content decide its own height, so nothing has to be
       measured in JS and long answers never get clipped. */
    (function () {
      var items = $$('.faq__item');
      if (!items.length) return;

      var pairs = items.map(function (item) {
        return { item: item, btn: $('.faq__q', item), panel: $('.faq__a', item) };
      }).filter(function (p) { return p.btn && p.panel; });

      function setOpen(target, open) {
        target.item.classList.toggle('is-open', open);
        target.btn.setAttribute('aria-expanded', String(open));
        target.panel.setAttribute('aria-hidden', String(!open));
      }

      pairs.forEach(function (p) {
        setOpen(p, false);
        p.btn.addEventListener('click', function () {
          var open = !p.item.classList.contains('is-open');
          pairs.forEach(function (other) { setOpen(other, other === p && open); });
        });
      });
    })();

    /* ---------- Contact page: enquiry form ----------
       Client-side only, same as the homepage CTA — point it at your endpoint
       before launch. Errors are announced per field rather than in one lump,
       and clear as soon as the visitor starts fixing them. */
    (function () {
      var form = $('#contactForm');
      if (!form) return;

      var out   = $('#contactMsg');
      var rules = [
        { id: 'cfName',    ok: function (v) { return v.length > 1; },
          err: 'Please tell us your name.' },
        { id: 'cfEmail',   ok: function (v) { return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v); },
          err: 'Please enter a valid email address.' },
        { id: 'cfPhone',   ok: function (v) { return v.replace(/\D/g, '').length >= 8; },
          err: 'Please enter a number we can reach you on.' },
        { id: 'cfService', ok: function (v) { return v !== ''; },
          err: 'Please choose a service.' },
        { id: 'cfMessage', ok: function (v) { return v.length > 9; },
          err: 'A sentence or two about the project helps us reply usefully.' }
      ];

      var fields = rules.map(function (rule) {
        var el = $('#' + rule.id);
        return el ? { el: el, msg: $('#' + rule.id + 'Err'), rule: rule } : null;
      }).filter(Boolean);

      function clear(f) {
        f.el.removeAttribute('aria-invalid');
        if (f.msg) f.msg.textContent = '';
      }

      fields.forEach(function (f) {
        f.el.addEventListener('input',  function () { clear(f); if (out) out.textContent = ''; });
        f.el.addEventListener('change', function () { clear(f); });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var firstBad = null;

        fields.forEach(function (f) {
          var valid = f.rule.ok((f.el.value || '').trim());
          f.el.setAttribute('aria-invalid', String(!valid));
          if (f.msg) f.msg.textContent = valid ? '' : f.rule.err;
          if (!valid && !firstBad) firstBad = f;
        });

        if (firstBad) {
          if (out) {
            out.classList.add('is-error');
            out.textContent = 'Please check the highlighted fields.';
          }
          firstBad.el.focus();
          return;
        }

        // [next] Saved through POST /api/enquiries; the server re-checks every rule.
        var serverIds = { name: 'cfName', email: 'cfEmail', phone: 'cfPhone', service: 'cfService', message: 'cfMessage' };
        setBusy(form, true);
        submitForm('/api/enquiries', {
          type: 'contact',
          name: $('#cfName').value, email: $('#cfEmail').value, phone: $('#cfPhone').value,
          service: $('#cfService').value, message: $('#cfMessage').value
        }).then(function (res) {
          setBusy(form, false);
          if (!res.ok) {
            var focus = null;
            Object.keys(res.fields).forEach(function (k) {
              var f = fields.find(function (x) { return x.el.id === serverIds[k]; });
              if (!f) return;
              f.el.setAttribute('aria-invalid', 'true');
              if (f.msg) f.msg.textContent = res.fields[k];
              if (!focus) focus = f.el;
            });
            if (out) { out.classList.add('is-error'); out.textContent = res.error; }
            if (focus) focus.focus();
            return;
          }
          if (out) {
            out.classList.remove('is-error');
            out.textContent = 'Thanks! We’ll be in touch within one business day.';
          }
          form.reset();
          fields.forEach(clear);
        });
      });
    })();

    /* ---------- Active nav link ---------- */
    var sections = $$('main section[id]');
    var navLinks = $$('.nav__link');

    function activeNav() {
      if (!sections.length) return;
      var mid = window.innerHeight * 0.4;
      var current = null;
      sections.forEach(function (s) {
        var r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = s.id;
      });
      if (!current) return;
      navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + current); });
    }

    /* ---------- CTA form ---------- */
    var form  = $('#ctaForm');
    var input = $('#ctaEmail');
    var msg   = $('#ctaMsg');

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var value = (input.value || '').trim();
        var valid = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);

        msg.classList.toggle('is-error', !valid);
        input.setAttribute('aria-invalid', String(!valid));

        if (!valid) {
          msg.textContent = 'Please enter a valid work email so we can reply.';
          input.focus();
          return;
        }
        // Demo only — wire this up to your CRM / form endpoint.
        msg.textContent = 'Thanks! We’ll be in touch within one business day.';
        form.reset();
        input.removeAttribute('aria-invalid');
      });

      input.addEventListener('input', function () {
        msg.textContent = '';
        msg.classList.remove('is-error');
        input.removeAttribute('aria-invalid');
      });
    }

    /* ---------- Misc ---------- */
    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    onScroll();
  })();

  /* ---------- Products page: phone app-screen slider ----------
     Self-contained so it runs the same from main.js or product.js. Dots
     are built from the slides, so they cannot drift out of step with them. */
  (function () {
    var sliders = document.querySelectorAll('.pd-slider');
    if (!sliders.length) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    Array.prototype.forEach.call(sliders, function (root) {
      var slides = root.querySelectorAll('.pd-slide');
      var dotsEl = root.querySelector('.pd-slider__dots');
      var cap    = root.querySelector('.pd-slider__cap');
      var webs   = root.querySelectorAll('.pd-wslide');
      var url    = root.querySelector('.pd__bar span');
      var n = slides.length, index = 0, timer = null, onScreen = false, paused = false;
      if (n < 2) return;

      var dots = Array.prototype.map.call(slides, function (s, i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'pd-slider__dot' + (i === 0 ? ' is-on' : '');
        d.setAttribute('aria-label', 'Show screen ' + (i + 1) + ' of ' + n);
        d.addEventListener('click', function () { show(i); restart(); });
        dotsEl.appendChild(d);
        return d;
      });

      function show(i) {
        var from = index;
        index = (i + n) % n;
        Array.prototype.forEach.call(slides, function (s, k) {
          s.classList.toggle('is-active', k === index);
          s.classList.toggle('is-out', k === from && k !== index);
          s.setAttribute('aria-hidden', String(k !== index));
        });
        // the browser page moves in step with the phone screen
        Array.prototype.forEach.call(webs, function (w, k) {
          w.classList.toggle('is-active', k === index);
          w.classList.toggle('is-out', k === from && k !== index);
          w.setAttribute('aria-hidden', String(k !== index));
        });
        if (url && webs[index]) url.textContent = webs[index].getAttribute('data-url') || '';
        dots.forEach(function (d, k) { d.classList.toggle('is-on', k === index); });
        if (cap) cap.innerHTML = slides[index].getAttribute('data-cap') || '';
      }

      function play() {
        if (reduced || timer) return;
        timer = setInterval(function () {
          if (!document.hidden && onScreen && !paused) show(index + 1);
        }, 3600);
      }
      function restart() { if (timer) { clearInterval(timer); timer = null; } play(); }

      Array.prototype.forEach.call(root.querySelectorAll('.pd-slider__btn'), function (b) {
        b.addEventListener('click', function () { show(index + (+b.getAttribute('data-step'))); restart(); });
      });
      root.addEventListener('pointerenter', function () { paused = true; });
      root.addEventListener('pointerleave', function () { paused = false; });
      root.addEventListener('focusin', function () { paused = true; });
      root.addEventListener('focusout', function () { paused = false; });
      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft')  { show(index - 1); restart(); }
        if (e.key === 'ArrowRight') { show(index + 1); restart(); }
      });

      var startX = null;
      root.addEventListener('pointerdown', function (e) { startX = e.clientX; });
      root.addEventListener('pointerup', function (e) {
        if (startX === null) return;
        var dx = e.clientX - startX; startX = null;
        if (Math.abs(dx) > 40) { show(index + (dx < 0 ? 1 : -1)); restart(); }
      });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { onScreen = en[0].isIntersecting; }, { threshold: 0.3 }).observe(root);
      } else { onScreen = true; }
      play();
    });
  })();

  /* ---------- Homepage: Our Process — the step being read drives the card ----------
     The active step is the last one whose top has passed 45% of the viewport.
     The card swaps its content with a short fade; the rail, dots, segments and
     ring follow. Self-contained, guarded on #prx. */
  (function () {
    var root = document.getElementById('prx');
    if (!root) return;
    var steps = root.querySelectorAll('.prx__step');
    var fill  = document.getElementById('prxFill');
    var list  = document.getElementById('prxList');
    var body  = document.getElementById('prxBody');
    var num   = document.getElementById('prxNum');
    var big   = document.getElementById('prxBig');
    var ico   = document.getElementById('prxIco');
    var title = document.getElementById('prxTitle');
    var text  = document.getElementById('prxText');
    var ring  = document.getElementById('prxRing');
    var segs  = document.querySelectorAll('#prxSegs i');
    var n = steps.length, current = -1;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function pad(i) { return (i < 9 ? '0' : '') + (i + 1); }

    function fillCard(i) {
      var st = steps[i];
      num.textContent = big.textContent = pad(i);
      ico.innerHTML = st.querySelector('.prx__ico').innerHTML;
      title.textContent = st.querySelector('h3').textContent;
      text.textContent = st.querySelector('.prx__d').textContent;
    }

    function activate(i) {
      if (i === current) return;
      current = i;
      Array.prototype.forEach.call(steps, function (st, k) {
        st.classList.toggle('is-active', k === i);
        st.classList.toggle('is-done', k < i);
      });
      Array.prototype.forEach.call(segs, function (sg, k) { sg.classList.toggle('is-on', k <= i); });
      if (ring) ring.style.strokeDashoffset = String(100 - ((i + 1) / n) * 100);
      // content swaps at once; the entrance animation is replayed on top of it
      fillCard(i);
      if (reduced) return;
      body.classList.remove('is-swap');
      void body.offsetWidth;
      body.classList.add('is-swap');
    }

    function update() {
      var mark = window.innerHeight * 0.45, idx = 0;
      Array.prototype.forEach.call(steps, function (st, k) {
        if (st.getBoundingClientRect().top <= mark) idx = k;
      });
      activate(idx);
      if (fill && list) {
        var r = list.getBoundingClientRect();
        var p = (mark - r.top - 40) / (r.height - 80);
        fill.style.height = (Math.max(0, Math.min(1, p)) * 100) + '%';
      }
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ---------- Homepage: Why Inovexia — bend the gallery into an arc ----------
     runTrack slides the rail; this reads where each card sits against the
     viewport centre (--off, -1…1) so CSS can tilt and drop the outer cards,
     and runs the counter from the card nearest the centre. Guarded on .wha. */
  (function () {
    var rail = document.querySelector('.wha__rail');
    if (!rail) return;
    var cards = rail.querySelectorAll('.wha__card');
    var items = rail.querySelectorAll('.wha__card.whys__card--navy, .wha__card.whys__card--light, .wha__card.whys__card--brand');
    var num = document.getElementById('whysNum');
    var ring = document.getElementById('whysRing');
    var narrow = window.matchMedia('(max-width: 900px)');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = -1;

    function update() {
      var cx = window.innerWidth / 2, best = 0, bestD = Infinity;
      Array.prototype.forEach.call(cards, function (c) {
        var r = c.getBoundingClientRect();
        var off = (r.left + r.width / 2 - cx) / (window.innerWidth * 0.75);
        off = Math.max(-1, Math.min(1, off));
        c.style.setProperty('--off', (narrow.matches || reduced) ? 0 : off.toFixed(3));
      });
      Array.prototype.forEach.call(items, function (c, i) {
        var r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - cx);
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best !== current) {
        current = best;
        if (num) { num.textContent = '0' + (best + 1); num.classList.remove('is-swap'); void num.offsetWidth; num.classList.add('is-swap'); }
        if (ring) ring.style.strokeDashoffset = String(100 - ((best + 1) / items.length) * 100);
      }
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { requestAnimationFrame(function () { update(); ticking = false; }); });
    }, { passive: true });
    window.addEventListener('resize', update);
    rail.addEventListener('scroll', update, { passive: true });
    update();

    if (false) {   /* card spotlight that followed the pointer: switched off */
      Array.prototype.forEach.call(cards, function (c) {
        c.addEventListener('pointermove', function (e) {
          var r = c.getBoundingClientRect();
          c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
          c.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
      });
    }
  })();

  /* ---------- Pause what nobody can see ----------
     Sections well out of view get .is-offscreen, which pauses their CSS
     animation loops (see style.css); SVG SMIL inside them is paused too.
     Applies on every page; nothing changes for what is on screen. */
  (function () {
    if (!('IntersectionObserver' in window)) return;
    var secs = document.querySelectorAll('main > section');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var off = !e.isIntersecting;
        e.target.classList.toggle('is-offscreen', off);
        Array.prototype.forEach.call(e.target.querySelectorAll('svg'), function (svg) {
          if (!svg.querySelector('animate, animateMotion, animateTransform') || !svg.pauseAnimations) return;
          if (off) svg.pauseAnimations(); else svg.unpauseAnimations();
        });
      });
    }, { rootMargin: '200px 0px' });
    Array.prototype.forEach.call(secs, function (s) { io.observe(s); });
  })();


  /* ---------- Cookie consent pop-up ----------
     Shown at the bottom of every page until the visitor chooses. The choice is
     kept in localStorage with a timestamp and only counts for CONSENT_MS.
     DEMO SETTING: 5 minutes, so the pop-up comes back during a demo. For
     launch, set CONSENT_MS to something like 180 days
     (180 * 24 * 60 * 60 * 1000). Guarded: runs once per page. */
  (function () {
    if (window.__inovexiaCookies) return;
    window.__inovexiaCookies = true;

    var KEY = 'inovexia-cookie-consent';
    var CONSENT_MS = 5 * 60 * 1000;      // demo: 5 minutes
    var box = null, timer = null;

    function read() {
      try { var v = JSON.parse(localStorage.getItem(KEY)); return v && v.at ? v : null; } catch (e) { return null; }
    }
    function valid(v) { return v && (Date.now() - v.at) < CONSENT_MS; }

    function build() {
      box = document.createElement('div');
      box.className = 'ckb';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-live', 'polite');
      box.setAttribute('aria-labelledby', 'ckbTitle');
      box.innerHTML =
        '<button type="button" class="ckb__x" data-ck="necessary" aria-label="Close. Only necessary cookies will be used"><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>' +
        '<div class="ckb__head"><span class="ckb__ico" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M20.5 12.5A8.5 8.5 0 1 1 11.5 3.5a3 3 0 0 0 3.6 3.6 3 3 0 0 0 3.8 3.8c.5.4 1 .9 1.6 1.6z"/><circle cx="8.5" cy="10" r="1"/><circle cx="12" cy="15" r="1"/><circle cx="15.5" cy="12.5" r=".6"/></svg></span>' +
        '<h2 id="ckbTitle">We use cookies</h2></div>' +
        '<p>We use cookies to keep this site working and to understand how it is used, so we can improve it. Read more in our <a href="/privacy#cookies">Privacy Policy</a>.</p>' +
        '<div class="ckb__actions">' +
        '<button type="button" class="btn btn--outline btn--sm" data-ck="necessary">Only necessary</button>' +
        '<button type="button" class="btn btn--primary btn--sm" data-ck="all"><span>Accept all</span></button>' +
        '</div>';
      document.body.appendChild(box);
      box.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('[data-ck]') : null;
        if (b) choose(b.getAttribute('data-ck'));
      });
    }

    function show() {
      if (!box) build();
      void box.offsetWidth;              // flush styles so the entrance transition runs
      box.classList.add('is-on');
    }
    function hide() { if (box) box.classList.remove('is-on'); }

    function choose(choice) {
      try { localStorage.setItem(KEY, JSON.stringify({ choice: choice, at: Date.now() })); } catch (e) {}
      hide();
      schedule();
    }

    // bring it back once the stored choice expires, even if the page stays open
    function schedule() {
      clearTimeout(timer);
      var v = read();
      if (!valid(v)) { show(); return; }
      timer = setTimeout(function () { if (!valid(read())) show(); }, CONSENT_MS - (Date.now() - v.at) + 250);
    }

    function start() {
      var force = /[?&]cookies\b/.test(location.search);   // demo: add ?cookies to any URL to see it now
      if (!force && valid(read())) { schedule(); return; }
      var intro = document.getElementById('intro');
      if (intro && !intro.classList.contains('is-gone')) {
        // homepage: show it as the loading curtain lifts, not hidden behind it
        document.addEventListener('inovexia:ready', show, { once: true });
        setTimeout(show, 1800);
      } else {
        show();
      }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  })();
}
