import { storageAvailable } from "./storage-availability.js";

export const Storage = (function () {
  const localAvailability = storageAvailable("localStorage");
  const sessionAvailability = storageAvailable("sessionStorage");

  function updateExample() {
    if (localAvailability) {
      localStorage.setItem("Example", "ValidJSON");
    }
    if (sessionAvailability) {
      sessionStorage.setItem("Example", "ValidJSON");
    }
  }

  function setExample() {
    const exampleLocal = localStorage.getItem("Example");
    const exampleSession = sessionStorage.getItem("Example");
    if (localAvailability && example) {
      // Do something
    }
    if (sessionAvailability && currentEvent) {
      // Do something
    }
  }

  return {
    updateExample,
    setExample,
  };
})();
