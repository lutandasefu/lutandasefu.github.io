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
  var profileHeading = document.getElementById('profile-heading');
  if (!profileHeading) return;
  var typingText = document.getElementById('profile-typing-text');
  var profileCursor = document.getElementById('profile-cursor');
  var image = document.getElementById('profile-image-wrap');
  var typingWrap = document.getElementById('profile-typing-wrap');
  var bio = document.getElementById('profile-bio');
  var contact = document.getElementById('profile-contact');
  var introText = "My name's Lutanda Sefu — lead graphic designer and founder of Epic Branding, a Johannesburg-based graphic design agency I've been running for over six years.";
  var index = 0;
  var typingSpeed = 40;

  function revealElement(el, delay) {
    setTimeout(function() {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    }, delay);
  }

  function typeProfile(callback) {
    if (index < introText.length) {
      typingText.textContent += introText.charAt(index);
      index++;
      setTimeout(function() { typeProfile(callback); }, typingSpeed);
    } else {
      if (profileCursor) profileCursor.style.animation = 'blink 1s infinite';
      if (callback) setTimeout(callback, 400);
    }
  }

  revealElement(profileHeading, 300);
  revealElement(image, 800);
  setTimeout(function() {
    revealElement(typingWrap, 0);
    setTimeout(function() {
      typeProfile(function() {
        revealElement(bio, 300);
        revealElement(contact, 700);
      });
    }, 500);
  }, 1400);
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

/* ===== CONFETTI ON BUTTON CLICK ===== */
function launchConfetti(e) {
  var btn = e.currentTarget;
  var rect = btn.getBoundingClientRect();
  var originX = rect.left + rect.width / 2;
  var originY = rect.top + rect.height / 2;
  var colors = [
    '#ffffff',
    'rgba(255,255,255,0.8)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.6)',
    '#aaaaaa',
    '#cccccc'
  ];
  var count = 60;

  for (var i = 0; i < count; i++) {
    createParticle(originX, originY, colors);
  }
}

function createParticle(x, y, colors) {
  var particle = document.createElement('div');
  var color = colors[Math.floor(Math.random() * colors.length)];
  var size = Math.random() * 6 + 3;
  var angle = Math.random() * Math.PI * 2;
  var velocity = Math.random() * 180 + 80;
  var vx = Math.cos(angle) * velocity;
  var vy = Math.sin(angle) * velocity;
  var rotation = Math.random() * 360;
  var rotationSpeed = Math.random() * 360 - 180;
  var isRect = Math.random() > 0.5;

  particle.style.cssText = [
    'position: fixed',
    'pointer-events: none',
    'z-index: 999999',
    'left: ' + x + 'px',
    'top: ' + y + 'px',
    'width: ' + size + 'px',
    'height: ' + (isRect ? size * 0.4 : size) + 'px',
    'background: ' + color,
    'border-radius: ' + (isRect ? '1px' : '50%'),
    'transform: translate(-50%, -50%) rotate(' + rotation + 'deg)',
    'opacity: 1'
  ].join(';');

  document.body.appendChild(particle);

  var start = null;
  var duration = Math.random() * 1000 + 1200;
  var gravity = 180;

  function animateParticle(timestamp) {
    if (!start) start = timestamp;
    var elapsed = timestamp - start;
    var progress = elapsed / duration;

    if (progress >= 1) {
      particle.remove();
      return;
    }

    var currentX = x + vx * progress;
    var currentY = y + vy * progress + 0.5 * gravity * progress * progress;
    var currentRotation = rotation + rotationSpeed * progress;
    var opacity = 1 - progress;

    particle.style.left = currentX + 'px';
    particle.style.top = currentY + 'px';
    particle.style.transform = 'translate(-50%, -50%) rotate(' + currentRotation + 'deg)';
    particle.style.opacity = opacity;

    requestAnimationFrame(animateParticle);
  }

  requestAnimationFrame(animateParticle);
}

/* attach confetti to all buttons */
document.querySelectorAll('#view-btn, .acc-view-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    var href = btn.getAttribute('href');

    if (href && href !== '#' && href !== '') {
      e.preventDefault();
      launchConfetti(e);
      setTimeout(function() {
        window.location.href = href;
      }, 1000);
    } else {
      launchConfetti(e);
    }
  });
});

/* ===== HERO TEXT ANIMATION ===== */
(function() {
  var heroName = document.getElementById('hero-name');
  var heroHeading = document.getElementById('hero-heading');
  var heroSub = document.getElementById('hero-sub');
  var viewBtn = document.getElementById('view-btn');

  if (!heroHeading) return;

  setTimeout(function() {
    if (heroName) heroName.classList.add('visible');
  }, 300);

  setTimeout(function() {
    heroHeading.classList.add('visible');
  }, 600);

  setTimeout(function() {
    if (heroSub) heroSub.classList.add('visible');
  }, 1200);

  setTimeout(function() {
    if (viewBtn) {
      viewBtn.classList.add('visible');
      viewBtn.style.animation = 'btnPulse 2.5s ease-in-out infinite';
    }
  }, 1600);
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
