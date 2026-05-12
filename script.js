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
  var toggle = document.getElementById("toggle-container");
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
        toggle.classList.add("visible");
      }, 500);
    }
  }

  setTimeout(type, 500);
})();
