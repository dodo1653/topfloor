document.addEventListener("DOMContentLoaded", () => {
  // Full-screen welcome overlay — backdrop texture only, no icon
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100vh;z-index:9999;" +
    "display:flex;justify-content:center;align-items:center;" +
    "background-color:#05060a;overflow:hidden;";
  document.body.appendChild(loadingScreen);

  // Backdrop: the X profile picture, blurred and very dim (quiet texture)
  const backdrop = document.createElement("div");
  backdrop.className = "loading-backdrop";
  backdrop.style.cssText =
    "position:absolute;top:0;left:0;width:100%;height:100%;" +
    "background-image:url('/assets/background.jpg');" +
    "background-position:center;background-size:cover;" +
    "filter:blur(14px);transform:scale(1.08);opacity:0;";
  loadingScreen.appendChild(backdrop);

  // Lock scroll while the welcome screen is up
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  // Cinematic but quick: backdrop breathes in, brief hold, fade out, slide away (~2s)
  const tl = gsap.timeline({
    onComplete: () => {
      loadingScreen.remove();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // Page height changed while the screen was up — recalc Lenis + triggers
      if (window.__lenis) window.__lenis.resize();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    },
  });

  tl.to(backdrop, { opacity: 0.1, duration: 0.7, ease: "power2.out" }, 0)
    .to({}, { duration: 1.95 }) // quiet hold (+1.5s — let the welcome breathe)
    .to(backdrop, { opacity: 0, duration: 0.35, ease: "power1.in" }, ">")
    .to(loadingScreen, { y: "-100%", duration: 0.6, ease: "power2.inOut" }, ">-0.05");
});
