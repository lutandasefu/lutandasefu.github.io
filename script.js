/* ===== SMOOTH SCROLL (LENIS) ===== */
const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
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
        var maxDist = 120;
        var alpha = 0.06;
        if (dist < maxDist) {
          alpha = 0.06 + (1 - dist / maxDist) * 0.25;
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

/* ===== FONT PRELOAD ===== */
document.fonts.ready.then(function() {
  var heading = document.getElementById('hero-heading');
  if (heading) heading.classList.add('font-ready');
});

/* ===== NAVBAR HIDE/SHOW ON SCROLL ===== */
var navbar = document.getElementById('custom-navbar');
var lastScroll = 0;
window.addEventListener('scroll', function() {
  var current = window.scrollY;
  if (current > lastScroll && current > 80) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});

/* ===== TYPING ANIMATION ===== */
(function() {
  var text = "Hi, I'm Lutanda Sefu, welcome to my portfolio";
  var typingElement = document.getElementById('typing-text');
  var cursor = document.getElementById('cursor');
  var viewBtn = document.getElementById('view-btn');
  var index = 0;
  var typingSpeed = 80;
  if (!typingElement) return;
  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    } else {
      if (cursor) cursor.style.animation = 'blink 1s infinite';
      setTimeout(function() {
        if (viewBtn) viewBtn.classList.add('visible');
      }, 500);
    }
  }
  setTimeout(type, 500);
})();

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
