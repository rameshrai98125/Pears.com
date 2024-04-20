gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
  lerp: 0.09,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// gsap.to(".page2 > h1", {
//   // xPercent: -500,
//   x: 500,
//   color: "red",
//   scrollTrigger: {
//     trigger: ".page2",
//     scroller: ".main",
//     markers: true,
//     start: "top top",
//     end: "bottom 10% ",
//     scrub: true,
//     stagger: 3,
//     pin: true,
//   },
// });

gsap.to(".scroller", {
  xPercent: -200,
  scrollTrigger: {
    trigger: ".scroller",
    scroller: ".main",
    scrub: true,
    stagger: 3,
    pin: true,
  },
});

gsap.to(".page1  h1", {
  y: -10,
  ease: Power1,
  // y: 100,
});

// gsap.to(".navbar h3 a", {
//   color: "red",
//   backgroundColor: "green",
//   zIndex: 22,
//   position: relative,
//   top: 0,
//   // x: 500,
//   scrollTrigger: {
//     trigger: ".page2",
//     scroller: "body",
//     markers: true,
//     start: "top 10%",
//     end: "bottom 10% ",
//     scrub: true,
//     // stagger: 3,
//     // pin: true,
//   },
// });

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const closeBtn = document.querySelector(".close-btn");
  const menu = document.querySelector(".menu");

  menuBtn.addEventListener("click", function () {
    menu.style.display = "flex";
    menuBtn.style.display = "none";
    closeBtn.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    menu.style.display = "none";
    menuBtn.style.display = "block";
    closeBtn.style.display = "none";
  });
});
