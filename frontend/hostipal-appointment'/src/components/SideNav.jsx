import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./SideNav.css";

gsap.registerPlugin(CustomEase);

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

gsap.defaults({
  ease: "main",
  duration: 0.7,
});

export default function SideNav() {
  const navWrapRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const navWrap = navWrapRef.current;
    const overlay = overlayRef.current;
    const menu = menuRef.current;
    const menuButton = menuButtonRef.current;

    if (!navWrap || !overlay || !menu || !menuButton) return;

    const bgPanels = navWrap.querySelectorAll("[data-sidenav-panel]");
    const menuToggles = document.querySelectorAll("[data-sidenav-toggle]");
    const menuLinks = navWrap.querySelectorAll("[data-sidenav-link]");
    const fadeTargets = navWrap.querySelectorAll("[data-sidenav-fade]");
    const menuButtonTexts = menuButton.querySelectorAll("[data-sidenav-label]");
    const menuButtonIcon = menuButton.querySelector("[data-sidenav-icon]");

    // Initialize GSAP states
    gsap.set(navWrap, { display: "none" });
    gsap.set(menu, { xPercent: 120 });
    gsap.set(overlay, { autoAlpha: 0 });
    bgPanels.forEach((panel) => {
      gsap.set(panel, { xPercent: 101 });
    });
    menuLinks.forEach((link) => {
      gsap.set(link, { yPercent: 140, rotate: 10 });
    });
    fadeTargets.forEach((target) => {
      gsap.set(target, { autoAlpha: 0, yPercent: 50 });
    });
    // Set initial button text positions
    if (menuButtonTexts.length >= 2) {
      // Menu (first) - visible at yPercent: 0
      gsap.set(menuButtonTexts[0], { yPercent: 0, opacity: 1 });
      // Close (second) - hidden below at yPercent: 100
      gsap.set(menuButtonTexts[1], { yPercent: 100, opacity: 1 });
    }
    gsap.set(menuButtonIcon, { rotate: 0 });

    let tl = gsap.timeline();
    tlRef.current = tl;

    const openNav = () => {
      navWrap.setAttribute("data-nav-state", "open");

      tl.clear()
        .set(navWrap, { display: "block" })
        .set(menu, { xPercent: 0 }, "<")
        .to(menuButtonTexts[0], { yPercent: -100 }) // Hide Menu
        .fromTo(menuButtonTexts[1], { yPercent: 100 }, { yPercent: 0 }, "<") // Show Close
        .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
        .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
        .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35")
        .fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2");
    };

    const closeNav = () => {
      navWrap.setAttribute("data-nav-state", "closed");

      tl.clear()
        .to(overlay, { autoAlpha: 0 })
        .to(menu, { xPercent: 120 }, "<")
        .to(menuButtonTexts[1], { yPercent: 100 }) // Hide Close
        .to(menuButtonTexts[0], { yPercent: 0 }, "<") // Show Menu
        .to(menuButtonIcon, { rotate: 0 }, "<")
        .set(navWrap, { display: "none" });
    };

    // Toggle menu open / close depending on its current state
    const handleToggle = () => {
      const state = navWrap.getAttribute("data-nav-state");
      if (state === "open") {
        closeNav();
      } else {
        openNav();
      }
    };

    menuToggles.forEach((toggle) => {
      toggle.addEventListener("click", handleToggle);
    });

    // If menu is open, you can close it using the "escape" key
    const keyHandler = (e) => {
      if (e.key === "Escape" && navWrap.getAttribute("data-nav-state") === "open") {
        closeNav();
      }
    };
    document.addEventListener("keydown", keyHandler);

    // Cleanup
    return () => {
      menuToggles.forEach((toggle) => {
        toggle.removeEventListener("click", handleToggle);
      });
      document.removeEventListener("keydown", keyHandler);
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="sidenav">
      <header className="sidenav__header">
        <button
          role="button"
          data-sidenav-toggle=""
          data-sidenav-button=""
          ref={menuButtonRef}
          className="sidenav__button"
        >
          <div className="sidenav__button-text">
            <p data-sidenav-label="" className="sidenav__button-label">
              Menu
            </p>
            <p data-sidenav-label="" className="sidenav__button-label">
              Close
            </p>
          </div>
          <div data-sidenav-icon="" className="sidenav__button-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 16 16"
              fill="none"
              className="sidenav__button-icon-svg"
            >
              <path
                d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                fill="currentColor"
              ></path>
              <path
                d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                fill="currentColor"
              ></path>
              <path
                d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                fill="currentColor"
              ></path>
              <path
                d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                fill="currentColor"
              ></path>
              <path
                d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                fill="currentColor"
              ></path>
              <path
                d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </header>
      <div
        ref={navWrapRef}
        data-sidenav-wrap=""
        data-nav-state="closed"
        className="sidenav__nav"
        style={{ display: "none" }}
      >
        <div
          ref={overlayRef}
          data-sidenav-overlay=""
          data-sidenav-toggle=""
          className="sidenav__overlay"
        ></div>
        <nav ref={menuRef} data-sidenav-menu="" className="sidenav__menu">
          <div className="sidenav__menu-bg">
            <div data-sidenav-panel="" className="sidenav__menu-bg-panel is--first"></div>
            <div data-sidenav-panel="" className="sidenav__menu-bg-panel is--second"></div>
            <div data-sidenav-panel="" className="sidenav__menu-bg-panel"></div>
          </div>
          <div className="sidenav__menu-inner">
            <ul className="sidenav__menu-list">
              <li className="sidenav__menu-list-item">
                <a data-sidenav-link="" href="#" className="sidenav__menu-link">
                  <p className="sidenav__menu-link-heading">About us</p>
                  <p className="sidenav__menu-link-eyebrow">01</p>
                </a>
              </li>
              <li className="sidenav__menu-list-item">
                <a data-sidenav-link="" href="#" className="sidenav__menu-link">
                  <p className="sidenav__menu-link-heading">Our work</p>
                  <p className="sidenav__menu-link-eyebrow">02</p>
                </a>
              </li>
              <li className="sidenav__menu-list-item">
                <a data-sidenav-link="" href="#" className="sidenav__menu-link">
                  <p className="sidenav__menu-link-heading">Services</p>
                  <p className="sidenav__menu-link-eyebrow">03</p>
                </a>
              </li>
              <li className="sidenav__menu-list-item">
                <a data-sidenav-link="" href="#" className="sidenav__menu-link">
                  <p className="sidenav__menu-link-heading">Blog</p>
                  <p className="sidenav__menu-link-eyebrow">04</p>
                </a>
              </li>
              <li className="sidenav__menu-list-item">
                <a data-sidenav-link="" href="#" className="sidenav__menu-link">
                  <p className="sidenav__menu-link-heading">Contact us</p>
                  <p className="sidenav__menu-link-eyebrow">05</p>
                </a>
              </li>
            </ul>
            <div className="sidenav__menu-details">
              <p data-sidenav-fade="" className="sidenav__button-label">
                Socials
              </p>
              <div className="sidenav__menu-socials">
                <a data-sidenav-fade="" href="#" className="sidenav__button-label">
                  Instagram
                </a>
                <a data-sidenav-fade="" href="#" className="sidenav__button-label">
                  LinkedIn
                </a>
                <a data-sidenav-fade="" href="#" className="sidenav__button-label">
                  X/Twitter
                </a>
                <a data-sidenav-fade="" href="#" className="sidenav__button-label">
                  Awwwards
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
