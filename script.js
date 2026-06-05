/* ===== SMOOTH SCROLL (LENIS) ===== */
const lenis = new Lenis({
  duration: 2.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.8,
  infinite: false,
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

/* ===== CUSTOM CURSOR ===== */
var cursorDot = document.getElementById('cursor-dot');
var cursorRing = document.getElementById('cursor-ring');
var mouseX = 0, mouseY = 0;
var ringX = 0, ringY = 0;

if (cursorDot && cursorRing) {
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .acc-view-btn').forEach(function(el) {
    el.addEventListener('mouseenter', function() { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function() { document.body.classList.remove('cursor-hover'); });
  });

  var heroHeading = document.getElementById('hero-heading');
  if (heroHeading) {
    heroHeading.addEventListener('mouseenter', function() {
      document.body.classList.add('cursor-heading');
      document.body.classList.remove('cursor-hover');
    });
    heroHeading.addEventListener('mouseleave', function() {
      document.body.classList.remove('cursor-heading');
    });
  }
}

/* ===== HAMBURGER MENU ===== */
var hamburgerIcon = document.getElementById('hamburger-icon');
var hamburgerDropdown = document.getElementById('hamburger-dropdown');

if (hamburgerIcon && hamburgerDropdown) {
  hamburgerIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburgerDropdown.classList.toggle('open');
  });

  document.addEventListener('click', function() {
    hamburgerDropdown.classList.remove('open');
  });

  hamburgerDropdown.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburgerDropdown.classList.remove('open');
    });
  });
}

/* ===== DOT GRID ===== */
var canvas = document.getElementById('dot-grid');
if (canvas) {
  var ctx = canvas.getContext('2d');
  var dotSpacing = 28;
  var dotRadius = 1;
  var cursorInfluence = { x: -999, y: -999 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  document.addEventListener('mousemove', function(e) {
    cursorInfluence.x = e.clientX;
    cursorInfluence.y = e.clientY;
  });

  function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var cols = Math.ceil(canvas.width / dotSpacing);
    var rows = Math.ceil(canvas.height / dotSpacing);
    for (var r = 0; r <= rows; r++) {
      for (var c = 0; c <= cols; c++) {
        var x = c * dotSpacing;
        var y = r * dotSpacing;
        var dist = Math.sqrt(
          Math.pow(x - cursorInfluence.x, 2) +
          Math.pow(y - cursorInfluence.y, 2)
        );
        var alpha = 0.06;
        if (dist < 120) {
          alpha = 0.06 + (1 - dist / 120) * 0.25;
        }
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
        ctx.fill();
      }
    }
    requestAnimationFrame(drawDots);
  }
  drawDots();
}


/* ===== NAVBAR HIDE/SHOW ON SCROLL ===== */
var navbar = document.getElementById('custom-navbar');
var lastScroll = 0;
var isHomePage = document.body.classList.contains('home');

window.addEventListener('scroll', function() {
  if (isHomePage) return;
  var current = window.scrollY;
  if (current > lastScroll && current > 80) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});


/* ===== ACCORDION CARDS ===== */
var accCards = document.querySelectorAll('.acc-card');
accCards.forEach(function(card) {
  card.addEventListener('click', function() {
    accCards.forEach(function(c) { c.classList.remove('active'); });
    card.classList.add('active');
  });
});

/* ===== PROFILE PAGE ANIMATION ===== */
(function() {
  var animElements = document.querySelectorAll('.profile-animate');
  if (!animElements.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  animElements.forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
    observer.observe(el);
  });
})();

/* ===== PROJECT OVERLAY ===== */
var overlay = document.getElementById('project-overlay');
var overlayBackdrop = document.getElementById('overlay-backdrop');
var overlayClose = document.getElementById('overlay-close');
var overlayTitle = document.getElementById('overlay-title');
var overlaySubtitle = document.getElementById('overlay-subtitle');
var overlayDescEl = document.getElementById('overlay-desc');

function openOverlay(title, subtitle, desc) {
  if (!overlay) return;
  if (overlayTitle) overlayTitle.textContent = title;
  if (overlaySubtitle) overlaySubtitle.textContent = subtitle;
  if (overlayDescEl) overlayDescEl.textContent = desc;
  overlay.classList.add('active');
  lenis.stop();
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  var panel = document.getElementById('overlay-panel');
  if (panel) panel.scrollTop = 0;
}

function closeOverlay() {
  if (!overlay) return;
  overlay.classList.remove('active');
  lenis.start();
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

if (overlayBackdrop) overlayBackdrop.addEventListener('click', closeOverlay);
if (overlayClose) overlayClose.addEventListener('click', closeOverlay);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeOverlay();
});

/* ===== CATEGORY PAGE ANIMATIONS ===== */
(function() {
  var tag = document.querySelector('.category-tag');
  var titleInner = document.querySelector('.category-title-inner');
  var desc = document.querySelector('.category-desc');
  var cards = document.querySelectorAll('.project-card');
  if (!tag) return;

  setTimeout(function() { tag.classList.add('visible'); }, 200);
  setTimeout(function() { if (titleInner) titleInner.classList.add('visible'); }, 400);
  setTimeout(function() { if (desc) desc.classList.add('visible'); }, 600);

  cards.forEach(function(card, i) {
    setTimeout(function() {
      card.classList.add('visible');
    }, 700 + i * 150);
  });
})();

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll(
  '.category-desc, .bio-para, .explore-btn, .project-block, .overlay-detail-item, .overlay-image-slot, .overlay-desc'
);

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var el = entry.target;
      var siblings = Array.from(el.parentElement.children);
      var index = siblings.indexOf(el);
      el.style.transitionDelay = (index * 0.1) + 's';
      el.classList.add('scroll-revealed');
      revealObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -20px 0px'
});

revealElements.forEach(function(el) {
  el.classList.add('scroll-hidden');
  revealObserver.observe(el);
});

/* ===== BUTTON FILL PULSE ===== */
function fillPulse(e) {
  var btn = e.currentTarget;
  btn.classList.add('btn-pulse-active');
  setTimeout(function() {
    btn.classList.remove('btn-pulse-active');
  }, 400);
}

document.querySelectorAll('#view-btn, .acc-view-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    var href = btn.getAttribute('href');
    fillPulse(e);
    if (href && href !== '#' && href !== '') {
      e.preventDefault();
      setTimeout(function() {
        window.location.href = href;
      }, 400);
    }
  });
});

/* ===== HERO TEXT ANIMATION ===== */
(function() {
  var badge = document.getElementById('availability-badge');
  var heroName = document.getElementById('hero-name');
  var heroHeading = document.getElementById('hero-heading');
  var heroSub = document.getElementById('hero-sub');
  var viewBtn = document.getElementById('view-btn');

  if (!heroHeading) return;

  setTimeout(function() {
    if (badge) badge.classList.add('visible');
  }, 200);

  setTimeout(function() {
    if (heroName) heroName.classList.add('visible');
  }, 500);

  setTimeout(function() {
    heroHeading.classList.add('visible');
  }, 800);

  setTimeout(function() {
    if (heroSub) heroSub.classList.add('visible');
  }, 1400);

  setTimeout(function() {
    if (viewBtn) {
      viewBtn.classList.add('visible');
      viewBtn.style.animation = 'btnPulse 2.5s ease-in-out infinite';
    }
  }, 1800);
})();

/* ===== CLICK SOUND ===== */
(function() {
  var audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playClick() {
    try {
      var ctx = getAudioContext();
      var oscillator = ctx.createOscillator();
      var gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(180, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.12);
    } catch(e) {}
  }

  document.addEventListener('click', function(e) {
    var target = e.target;
    var isClickable =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.acc-card') ||
      target.closest('.explore-btn') ||
      target.closest('.project-card') ||
      target.closest('#overlay-close');

    if (isClickable) playClick();
  });
})();
