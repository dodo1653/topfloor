document.addEventListener("DOMContentLoaded", () => {
  const isPhone = window.innerWidth < 768;

  // Full-screen welcome overlay
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100vh;z-index:9999;" +
    "display:flex;justify-content:center;align-items:center;" +
    "background-color:#05060a;overflow:hidden;";
  document.body.appendChild(loadingScreen);

  // Backdrop: the X profile picture, blurred and very dim (quiet texture, not a feature)
  const backdrop = document.createElement("div");
  backdrop.className = "loading-backdrop";
  backdrop.style.cssText =
    "position:absolute;top:0;left:0;width:100%;height:100%;" +
    "background-image:url('/assets/scanners_logo.png');" +
    "background-position:center;background-size:cover;" +
    "filter:blur(14px);transform:scale(1.08);opacity:0;";
  loadingScreen.appendChild(backdrop);

  // Icon: big square profile picture, same language as the navbar mark
  const icon = document.createElement("img");
  icon.src = "/assets/scanners_logo.png";
  icon.className = "loading-icon";
  icon.style.cssText =
    "position:relative;width:" + (isPhone ? "240px" : "340px") + ";height:auto;" +
    "border-radius:14px;box-shadow:0 30px 80px rgba(0,0,0,.6);" +
    "opacity:0;transform:scale(.94) translateY(10px);will-change:transform,opacity;";
  loadingScreen.appendChild(icon);

  // Lock scroll while the welcome screen is up
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  // Cinematic but quick: backdrop breathes in, icon fades up, one short breath,
  // brief hold, fade out together, slide away. (~3s total)
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

  tl.to(backdrop, { opacity: 0.1, duration: 0.6, ease: "power2.out" }, 0)
    .to(icon, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.1)
    .to(icon, { y: -6, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: 1 }, ">0.05")
    .to({}, { duration: 0.15 }) // brief hold
    .to(icon, { opacity: 0, duration: 0.35, ease: "power1.in" }, ">")
    .to(backdrop, { opacity: 0, duration: 0.35, ease: "power1.in" }, "<")
    .to(loadingScreen, { y: "-100%", duration: 0.7, ease: "power2.inOut" }, ">-0.05");
});
