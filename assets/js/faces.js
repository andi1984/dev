const NUMBER_OF_FACES = 70;

export default () => {
  let idleCallbackRequest, facesElement, loadTimeout, resizeTimeout;

  const setFace = () => {
    facesElement = document.getElementById('faces');

    // If the faces container currently has a background image, then we know
    // that we are allowed to show a different one, otherwise we do nothing.
    if (window.getComputedStyle(facesElement).backgroundImage !== 'none') {
      const faceNr = Math.floor(Math.random() * NUMBER_OF_FACES) + 1;
      facesElement.style.backgroundImage = `url('/assets/${faceNr}.png')`;
    }
  };

  const setNewBackgroundValues = () => {
    if ('requestIdleCallback' in window) {
      // Use requestIdleCallback to schedule work.
      if (idleCallbackRequest) {
        window.cancelIdleCallback(idleCallbackRequest);
      }

      idleCallbackRequest = window.requestIdleCallback(setFace);
    } else {
      // Do what you’d do today.
      setFace();
    }
  };

  let prevOnLoad;
  if (typeof window.onload === 'function') {
    prevOnLoad = window.onload;
  }
  window.onload = () => {
    if (!!prevOnLoad) {
      prevOnLoad();
    }

    // Wait x seconds before changing the background image.
    loadTimeout = window.setTimeout(() => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }

      setNewBackgroundValues();
    }, 20000);
  };

  window.addEventListener('resize', () => {
    // Remove all inline style
    if (facesElement) {
      facesElement.removeAttribute('style');
    }

    if (loadTimeout) {
      window.clearTimeout(loadTimeout);
    }

    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout);
    }

    resizeTimeout = window.setTimeout(() => {
      // Reset background again.
      setNewBackgroundValues();
    }, 5000);
  });
};
