/* ===== SMOOTH SCROLL (LENIS) ===== */
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ===== FONT PRELOAD ===== */
document.fonts.ready.then(function() {
  var heading = document.getElementById("hero-heading");
  if (heading) heading.classList.add("font-ready");
});

/* ===== NAVBAR HIDE/SHOW ON SCROLL ===== */
const navbar = document.getElementById("custom-navbar");
let lastScroll = 0;
window.addEventListener("scroll", () => {
  let current = window.scrollY;
  if (current > lastScroll && current > 80) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }
  lastScroll = current;
});

/* ===== TYPING ANIMATION ===== */
(function() {
  var text = "Hi, I'm Lutanda Sefu, welcome to my portfolio";
  var typingElement = document.getElementById("typing-text");
  var cursor = document.getElementById("cursor");
  var viewBtn = document.getElementById("view-btn");
  var index = 0;
  var typingSpeed = 80;

  if (!typingElement) return;

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    } else {
      cursor.style.animation = "blink 1s infinite";
      setTimeout(function() {
        if (viewBtn) viewBtn.classList.add("visible");
      }, 500);
    }
  }

  setTimeout(type, 500);
})();

/* ===== ACCORDION CARDS ===== */
const accCards = document.querySelectorAll('.acc-card');
accCards.forEach(card => {
  card.addEventListener('click', () => {
    accCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

/* ===== PROFILE PAGE ANIMATION ===== */
(function() {
  var profileHeading = document.getElementById("profile-heading");
  if (!profileHeading) return;

  var typingText = document.getElementById("profile-typing-text");
  var profileCursor = document.getElementById("profile-cursor");
  var image = document.getElementById("profile-image-wrap");
  var typingWrap = document.getElementById("profile-typing-wrap");
  var bio = document.getElementById("profile-bio");
  var contact = document.getElementById("profile-contact");

  var introText = "My name's Lutanda Sefu — lead graphic designer and founder of Epic Branding, a Johannesburg-based graphic design agency I've been running for over six years.";
  var index = 0;
  var typingSpeed = 40;

  function revealElement(el, delay) {
    setTimeout(function() {
      if (el) el.classList.add("visible");
    }, delay);
  }

  function typeLine(callback) {
    if (index < introText.length) {
      typingText.textContent += introText.charAt(index);
      index++;
      setTimeout(function() { typeLine(callback); }, typingSpeed);
    } else {
      profileCursor.style.animation = "blink 1s infinite";
      if (callback) setTimeout(callback, 400);
    }
  }

  // Sequence: heading → image → typing → bio → contact
  revealElement(profileHeading, 300);
  revealElement(image, 800);

  setTimeout(function() {
    revealElement(typingWrap, 0);
    setTimeout(function() {
      typeLine(function() {
        revealElement(bio, 300);
        revealElement(contact, 700);
      });
    }, 500);
  }, 1400);

})();
