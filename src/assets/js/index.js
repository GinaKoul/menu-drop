import "../css/styles.css";
import { PubSub } from "./pubsub.js";
import { documentMock } from "./document-mock.js";

(function () {
  let navButtons;

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("Looks like we are in development mode!");
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleNavigation(event) {
    // Do something
    scrollToTop();
  }

  function initNavigation() {
    navButtons = document.querySelectorAll(".menu-nav");
    navButtons.forEach((navButton) => {
      navButton.addEventListener("click", handleNavigation);
    });
  }


  function init() {
    initNavigation();

    // Main application logic
  }

  window.addEventListener("storage", () => {
    init();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTodo);
  } else {
    init();
  }
})(document || documentMock);
