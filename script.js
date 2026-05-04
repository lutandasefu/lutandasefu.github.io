/* ---------- LOADER ---------- */

window.onload = () => {
setTimeout(()=>{
document.getElementById("loader").style.opacity="0";
setTimeout(()=>{
document.getElementById("loader").remove();
},800);
},1200);
};

/* ---------- SMOOTH SCROLL ---------- */

const lenis = new Lenis({
duration:1.2,
smooth:true
});

function raf(time){
lenis.raf(time);
requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* ---------- NAV FADE ---------- */

let lastScroll = 0;
const nav = document.getElementById("nav");

window.addEventListener("scroll",()=>{
let current = window.scrollY;

if(current > lastScroll){
nav.style.transform="translateY(-100%)";
}else{
nav.style.transform="translateY(0)";
}

lastScroll = current;
});
