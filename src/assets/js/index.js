import "../css/styles.css";
import { documentMock } from "./document-mock.js";

(function (doc) {
  let dropdownButtons, windowWidth;

  function menuToggle(event) {
    event.stopPropagation();
    const currentContainer = event.target.closest(".drop-container");
    currentContainer.classList.toggle("visible");
  }

  function isLarger(menu) {
    return (
      parseInt(getComputedStyle(menu).getPropertyValue("min-width"), 10) >
      windowWidth
    );
  }

  function isRightSide(btn) {
    const rect = btn.getBoundingClientRect();
    const distanceRight = windowWidth - rect.right;
    const distanceLeft = rect.left;
    return distanceRight < distanceLeft;
  }

  function addStyling(btn) {
    const currentMenu = btn
      .closest(".drop-container")
      .querySelector(".drop-menu");
    if (currentMenu) {
      if (isRightSide(btn)) currentMenu.style.setProperty("right", 0);
      if (isLarger(currentMenu)) {
        currentMenu.style.setProperty("min-width", "unset");
        currentMenu.style.setProperty("width", "100%");
      }
      currentMenu.style.setProperty(
        "--drop-menu-h",
        currentMenu.scrollHeight + "px",
      );
    }
  }

  function bindEvents() {
    dropdownButtons.forEach((btn) => {
      addStyling(btn);
      btn.addEventListener("click", menuToggle);
    });
  }

  function init() {
    dropdownButtons = doc.querySelectorAll(".drop-toggle");
    windowWidth = window.innerWidth;
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(document || documentMock);
