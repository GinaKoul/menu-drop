import "../css/styles.css";
import { documentMock } from "./document-mock.js";

(function (doc) {
  const breakSm = 480;
  const breakMd = 768;
  const breakLg = 1279;
  let prevWindowSize = "lg";
  let curWindowSize = "lg";
  let dropdownButtons;
  let windowWidth;

  function closeMenu(event) {
    event.stopPropagation();
    const activeMenu = doc.querySelector(".drop-container.visible");
    if (activeMenu && !activeMenu?.contains(event.target)) {
      activeMenu.classList.remove("visible");
    }
  }

  function menuToggle(event) {
    event.stopPropagation();
    closeMenu(event);
    const currentContainer = event.target.closest(".drop-container");
    currentContainer.classList.toggle("visible");
  }

  function setCurrentSize() {
    if (windowWidth > breakLg) {
      curWindowSize = "xl";
    } else if (windowWidth > breakMd && windowWidth <= breakLg) {
      curWindowSize = "lg";
    } else if (windowWidth > breakSm && windowWidth <= breakMd) {
      curWindowSize = "md";
    } else if (windowWidth <= breakSm) {
      curWindowSize = "sm";
    }
  }

  function breakpointChanged() {
    return prevWindowSize !== curWindowSize;
  }

  function isGreater(menu) {
    return (
      parseInt(getComputedStyle(menu).getPropertyValue("min-width"), 10) >
      windowWidth
    );
  }

  function getDistanceRight(rect) {
    return windowWidth - rect.right;
  }

  function getDistanceLeft(rect) {
    return rect.left;
  }

  function getRect(el) {
    return el.getBoundingClientRect();
  }

  function isRightSide(rect) {
    return getDistanceRight(rect) < getDistanceLeft(rect);
  }

  function addStyling(btn) {
    const currentMenu = btn
      .closest(".drop-container")
      .querySelector(".drop-menu");
    if (currentMenu) {
      const rect = getRect(btn);
      if (isRightSide(rect)) {
        currentMenu.style.setProperty("right", 0);
      } else {
        currentMenu.style.removeProperty("right");
      }
      if (isGreater(currentMenu)) {
        currentMenu.style.setProperty("min-width", "unset");
        currentMenu.style.setProperty("width", "100vw");
        currentMenu.style.setProperty("right", `-${getDistanceRight(rect)}px`);
      }
      currentMenu.style.setProperty(
        "--drop-menu-h",
        currentMenu.scrollHeight + "px",
      );
    }
  }

  function updateStyling() {
    dropdownButtons.forEach((btn) => {
      addStyling(btn);
    });
  }

  function evalBreakpoints() {
    windowWidth = window.innerWidth;
    setCurrentSize();
    if (breakpointChanged()) {
      updateStyling();
      prevWindowSize = curWindowSize;
    }
  }

  function bindEvents() {
    dropdownButtons.forEach((btn) => btn.addEventListener("click", menuToggle));
    window.addEventListener("resize", evalBreakpoints);
    window.addEventListener("click", closeMenu);
  }

  function init() {
    dropdownButtons = doc.querySelectorAll(".drop-toggle");
    windowWidth = window.innerWidth;
    bindEvents();
    updateStyling();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(document || documentMock);
