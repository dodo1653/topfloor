// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync
// Lerp mode (not duration mode): input responds immediately, position catches
// up exponentially — instant feel, velvet glide. Native touch on phones.
const lenis = new Lenis({
  lerp: 0.115,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 1.05,
  touchMultiplier: 1.4,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
window.__lenis = lenis;

// Recalculate Lenis's scroll limit once all images/fonts have loaded (it inits
// while the loading screen is up, when the page is still short)
window.addEventListener('load', () => {
  lenis.resize();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
});
// Mobile: browser chrome show/hide and orientation flips change viewport height
window.addEventListener('orientationchange', () => {
  lenis.resize();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
});

// Anchor links glide through Lenis instead of jumping — quick, weighty glide
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
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

gsap.registerPlugin(ScrollTrigger);const isSmallScreen = window.innerWidth < 1300;

// Add staggered delays to each block animation
gsap.to(".block", {
  yPercent: isSmallScreen ? -200 : -900,
  scrollTrigger: {
    trigger: ".section-2",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
  ease: "none",
  delay: 0
});

gsap.to(".block-2", {
  yPercent: isSmallScreen ? -600 : -2700,
  scrollTrigger: {
    trigger: ".section-2",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
  ease: "none",
  delay: 0.2
});

gsap.to(".block-3", {
  yPercent: isSmallScreen ? -500 : -2300,
  scrollTrigger: {
    trigger: ".section-2",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
  ease: "none",
  delay: 0.4
});

gsap.to(".block-4", {
  yPercent: isSmallScreen ? -400 : -2000,
  scrollTrigger: {
    trigger: ".section-2",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
  ease: "none",
  delay: 0.6
});

gsap.to(".block-5", {
  yPercent: isSmallScreen ? -450 : -2100,
  scrollTrigger: {
    trigger: ".section-2",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
  ease: "none",
  delay: 0.8
});

gsap.to(".block-6", {
  yPercent: isSmallScreen ? -750 : -3750,
  scrollTrigger: {
    trigger: ".section-2",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
  ease: "none",
  delay: 1
});

// Magnifying glass spiral "scanning" animation on loop (no initial jump)

gsap.to(".image-4", {
  keyframes: [
    { x: "+=20", y: "-=10", rotation: "+=10", duration: 0.6, ease: "power1.inOut" },
    { x: "+=10", y: "+=20", rotation: "+=10", duration: 0.6, ease: "power1.inOut" },
    { x: "-=20", y: "+=10", rotation: "-=10", duration: 0.6, ease: "power1.inOut" },
    { x: "-=10", y: "-=20", rotation: "-=10", duration: 0.6, ease: "power1.inOut" }
  ],
  repeat: -1
});

// money icon on the pricing headline — same idle drift as the hero one
if (document.querySelector(".image-money-pricing")) {
  gsap.to(".image-money-pricing", {
    keyframes: [
      { x: "+=20", y: "-=10", rotation: "+=10", duration: 0.6, ease: "power1.inOut" },
      { x: "+=10", y: "+=20", rotation: "+=10", duration: 0.6, ease: "power1.inOut" },
      { x: "-=20", y: "+=10", rotation: "-=10", duration: 0.6, ease: "power1.inOut" },
      { x: "-=10", y: "-=20", rotation: "-=10", duration: 0.6, ease: "power1.inOut" }
    ],
    repeat: -1
  });
}



// Infinite vertical loop for .div-block-3 (reviews carousel)
const reviewsContainer = document.querySelector('.div-block-3');
const reviewsTrack = reviewsContainer ? reviewsContainer.querySelector('.reviews-track') : null;

if (reviewsTrack) {
  // Remove previous clones to avoid stacking on hot reload
  Array.from(reviewsTrack.children).forEach(el => {
    if (el.classList.contains('is-clone')) el.remove();
  });

  // Duplicate all review items for seamless looping
  const reviews = Array.from(reviewsTrack.children);
  reviews.forEach(review => {
    const clone = review.cloneNode(true);
    clone.classList.add('is-clone');
    reviewsTrack.appendChild(clone);
  });

  // Calculate total height of original reviews
  const reviewHeights = reviews.map(el => el.offsetHeight);
  const totalHeight = reviewHeights.reduce((sum, h) => sum + h, 0);

  // Set track to column flex for stacking
  reviewsTrack.style.display = "flex";
  reviewsTrack.style.flexDirection = "column";

  // Animate the track upward, looping seamlessly
  gsap.to(reviewsTrack, {
    y: -totalHeight,
    duration: reviews.length * 3, // 3 seconds per review, adjust as needed
    ease: "none",
    repeat: -1,
    modifiers: {
      y: gsap.utils.unitize(y => parseFloat(y) % totalHeight)
    }
  });

  // Optional: Hide overflow on container
  reviewsContainer.style.overflow = "hidden";
}

// Money image animation (image-8): gentle bounce and tilt loop
gsap.to(".image-8", {
  keyframes: [
    { rotation: -10, duration: 0.8, ease: "power1.inOut" },
    { rotation: 8, duration: 0.8, ease: "power1.inOut" },
    { rotation: -5, duration: 0.8, ease: "power1.inOut" },
    { rotation: 6, duration: 0.8, ease: "power1.inOut" },
    { rotation: -10, duration: 0.8, ease: "power1.inOut" }
  ],
  repeat: -1
});

// Infinite horizontal loop for .pnls-line
const pnlsContainer = document.querySelector('.pnls-line');
const pnlsTrack = pnlsContainer ? pnlsContainer.querySelector('.pnls-track') : null;

if (pnlsTrack) {
  // Remove previous clones to avoid stacking
  Array.from(pnlsTrack.children).forEach(el => {
    if (el.classList.contains('is-clone')) el.remove();
  });

  // Duplicate all panel items for seamless looping
  const panels = Array.from(pnlsTrack.children);
  panels.forEach(panel => {
    const clone = panel.cloneNode(true);
    clone.classList.add('is-clone');
    pnlsTrack.appendChild(clone);
  });

  // Calculate total width of original panels
  const panelWidths = panels.map(el => el.offsetWidth);
  const totalWidth = panelWidths.reduce((sum, w) => sum + w, 0);

  // Set track to row flex for horizontal stacking
  pnlsTrack.style.display = "flex";
  pnlsTrack.style.flexDirection = "row";
  pnlsTrack.style.flexWrap = "nowrap";

  // Animate the track leftward, looping seamlessly.
  // Width math includes the flex GAP between panels (the old version measured
  // bare widths, so the modulo wrap landed off-target and the loop stuttered).
  const PANEL_GAP = 10;
  const setWidth = () =>
    panels.reduce((sum, el) => sum + el.getBoundingClientRect().width + PANEL_GAP, 0);

  const pnlsLoop = gsap.to(pnlsTrack, {
    x: () => -setWidth(),
    duration: panels.length * 2, // 2 seconds per panel
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => {
        const w = setWidth();
        return w ? parseFloat(x) % w : 0;
      })
    }
  });

  // re-measure once every image has its real size, so the loop stays exact
  window.addEventListener("load", () => pnlsLoop.invalidate());

  // Hide overflow on container
  pnlsContainer.style.overflow = "hidden";
}

gsap.utils.toArray(".navbar img").forEach(logo => {
  logo.addEventListener("mouseenter", () => {
    gsap.to(logo, {
      rotation: 360,
      duration: 1.5,
      ease: "power2.inOut"
    });
  });
  logo.addEventListener("mouseleave", () => {
    gsap.to(logo, {
      rotation: 0,
      duration: 1.5,
      ease: "power2.inOut"
    });
  });
});