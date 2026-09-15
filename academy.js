// TOP FLOOR ACADEMY — motion layer
// Mirrors the reference page's feel: money wobble, mentor pfp wobble, logo spin.

// Lenis smooth scrolling — same silky lerp feel as the main site
const lenis = new Lenis({
  lerp: 0.115,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 1.05,
  touchMultiplier: 1.4,
});
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
window.__lenis = lenis;

gsap.to(".hero-money", {
  keyframes: [
    { x: "+=20", y: "-=10", rotation: "+=10", duration: 0.6, ease: "power1.inOut" },
    { x: "+=10", y: "+=20", rotation: "+=10", duration: 0.6, ease: "power1.inOut" },
    { x: "-=20", y: "+=10", rotation: "-=10", duration: 0.6, ease: "power1.inOut" },
    { x: "-=10", y: "-=20", rotation: "-=10", duration: 0.6, ease: "power1.inOut" }
  ],
  repeat: -1
});

document.querySelectorAll(".mentor-pfp").forEach((pfp, i) => {
  gsap.to(pfp, {
    keyframes: [
      { rotation: "+=6", duration: 1.2, ease: "sine.inOut" },
      { rotation: "-=6", duration: 1.2, ease: "sine.inOut" }
    ],
    repeat: -1,
    delay: i * 0.25
  });
});

document.querySelectorAll(".brand-link img").forEach((logo) => {
  logo.addEventListener("mouseenter", () => {
    gsap.fromTo(logo, { rotation: 0 }, { rotation: 360, duration: 0.8, ease: "power2.out" });
  });
});

// Smooth-scroll for same-page anchors via Lenis
 document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      lenis.scrollTo(id, {
        offset: -80,
        duration: 1.4,
        easing: (t) => 1 - Math.pow(2, -10 * t)
      });
    }
  });
});
