const loader = document.getElementById("loader");
const nav = document.getElementById("nav");

/* LOADER */
if (loader) {
  window.onload = () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 800);
    }, 1200);
  };
}

/* LENIS */
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true
});

function raf(time){
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* NAV */
if (nav) {
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    let current = window.scrollY;

    if (current > lastScroll && current > 80) {
      nav.style.transform = "translateY(-100%)";
    } else {
      nav.style.transform = "translateY(0)";
    }

    lastScroll = current;
  });
}
