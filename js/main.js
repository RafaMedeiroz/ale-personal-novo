/* ==========================================================
   ALE FERRAZ — Saúde em Movimento
   Interações: barra, menu, tamanho de texto, seletor de
   público, contadores, anéis, tilt, revelar ao rolar.
   ========================================================== */
(function () {
  'use strict';
  var html = document.documentElement;
  html.classList.add('js');
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WA = 'https://wa.me/5515974036496?text=';

  /* ---------- Barra e menu ---------- */
  var topo = document.getElementById('topo');
  var hamb = document.getElementById('hamb');
  var menu = document.getElementById('menu');
  function aoRolar() { topo.classList.toggle('rolou', window.scrollY > 10); }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();
  function fechaMenu() { menu.classList.remove('aberto'); hamb.setAttribute('aria-expanded', 'false'); }
  hamb.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    hamb.setAttribute('aria-expanded', String(aberto));
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fechaMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechaMenu(); });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('aberto') && !menu.contains(e.target) && !hamb.contains(e.target)) fechaMenu();
  });

  /* ---------- Tamanho de texto (A− / A / A+), lembrado no navegador ---------- */
  var botoesTexto = document.querySelectorAll('[data-texto]');
  function aplicaTexto(nivel, salvar) {
    nivel = Math.min(3, Math.max(1, nivel));
    html.setAttribute('data-texto', String(nivel));
    botoesTexto.forEach(function (b) { b.setAttribute('aria-pressed', String(parseInt(b.getAttribute('data-texto'), 10) === nivel)); });
    if (salvar) { try { localStorage.setItem('af-texto', String(nivel)); } catch (e) { /* sem armazenamento */ } }
  }
  var salvo = 1;
  try { salvo = parseInt(localStorage.getItem('af-texto') || '1', 10) || 1; } catch (e) { /* ignora */ }
  aplicaTexto(salvo, false);
  botoesTexto.forEach(function (b) {
    b.addEventListener('click', function () { aplicaTexto(parseInt(b.getAttribute('data-texto'), 10), true); });
  });

  /* ---------- Seletor de público no hero ---------- */
  var publicos = {
    reab: {
      b: 'Reab.',
      sub: 'Voltar a se mover depois de uma lesão, cirurgia ou dor crônica, com treino montado em torno da sua limitação e em parceria com o seu médico e fisioterapeuta.',
      selo: 'Treino de reabilitação',
      selo2: 'pós-lesão e pós-cirurgia',
      msg: 'Olá Ale! Estou em recuperação de uma lesão e quero saber como funciona o treino de reabilitação.'
    },
    sessenta: {
      b: '60+',
      sub: 'Força, equilíbrio e autonomia para subir escada sem medo, carregar as compras e brincar com os netos. No seu ritmo, sem pressa.',
      selo: 'Treino para 60+',
      selo2: 'começando do zero, com segurança',
      msg: 'Olá Ale! Tenho interesse no treino para terceira idade. Pode me explicar como funciona?'
    },
    emagrecer: {
      b: '−kg',
      sub: 'Perder peso sem dieta maluca nem treino punitivo. Avaliação, plano progressivo e acompanhamento de perto para o resultado durar.',
      selo: 'Emagrecimento saudável',
      selo2: 'acompanhamento semana a semana',
      msg: 'Olá Ale! Quero emagrecer com saúde e gostaria de saber como funciona o acompanhamento.'
    }
  };
  var sub = document.getElementById('heroSub');
  var seloB = document.getElementById('seloPublico');
  var seloN = document.getElementById('seloPublicoNum');
  var seloS = document.getElementById('seloPublicoDesc');
  var ctaHero = document.getElementById('ctaHero');
  var chips = document.querySelectorAll('.publicos button');
  function trocaPublico(chave) {
    var d = publicos[chave];
    if (!d) return;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-publico') === chave)); });
    ctaHero.href = WA + encodeURIComponent(d.msg);
    var aplica = function () {
      sub.textContent = d.sub;
      seloB.textContent = d.selo;
      seloN.textContent = d.b;
      seloS.textContent = d.selo2;
      sub.classList.remove('trocando');
    };
    if (reduz) { aplica(); return; }
    sub.classList.add('trocando');
    setTimeout(aplica, 220);
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { trocaPublico(c.getAttribute('data-publico')); }); });

  /* ---------- Contadores e anéis ao entrar na tela ---------- */
  function conta(el) {
    var alvo = parseInt(el.getAttribute('data-n'), 10);
    var suf = el.getAttribute('data-suf') || '';
    if (reduz) { el.textContent = alvo + suf; return; }
    var ini = null, dur = 1800;
    function passo(t) {
      if (ini === null) ini = t;
      var p = Math.min((t - ini) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(alvo * e) + suf;
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        if (el.hasAttribute('data-n')) conta(el);
        if (el.classList.contains('anel')) el.classList.add('ativo');
        if (el.classList.contains('revela')) el.classList.add('em');
        io.unobserve(el);
      });
    }, { threshold: .12, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('[data-n], .anel, .revela').forEach(function (el) { io.observe(el); });
    /* Segurança: se algo não for observado (navegador antigo, erro), tudo aparece depois de 4s */
    setTimeout(function () { document.querySelectorAll('.revela:not(.em)').forEach(function (el) { el.classList.add('em'); }); }, 4000);
  } else {
    document.querySelectorAll('[data-n]').forEach(function (el) { el.textContent = el.getAttribute('data-n') + (el.getAttribute('data-suf') || ''); });
    document.querySelectorAll('.anel').forEach(function (el) { el.classList.add('ativo'); });
    document.querySelectorAll('.revela').forEach(function (el) { el.classList.add('em'); });
  }

  /* ---------- Tilt 3D do retrato (só com mouse, nunca no toque) ---------- */
  if (!reduz && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.retrato').forEach(function (area) {
      var alvo = area.querySelector('.moldura');
      area.addEventListener('mousemove', function (e) {
        var r = alvo.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        alvo.style.transform = 'rotateY(' + (x * 10).toFixed(2) + 'deg) rotateX(' + (-y * 10).toFixed(2) + 'deg)';
      });
      area.addEventListener('mouseleave', function () { alvo.style.transform = ''; });
    });
  }

  /* ---------- Rolagem suave com compensação da barra ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var alvo = document.querySelector(id);
      if (!alvo) return;
      e.preventDefault();
      var y = alvo.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: reduz ? 'auto' : 'smooth' });
      alvo.setAttribute('tabindex', '-1');
      alvo.focus({ preventScroll: true });
    });
  });
})();
