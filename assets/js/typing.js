export default () => {
  let resizeTimeout;
  const checkTyping = (typing) => {
    const numChars = typing.innerText.length;
    // If there is twice as much space as chars needed, it should probably fit...
    const mediaQueryList = window.matchMedia(`(min-width: ${2 * numChars}ch)`);
    if (mediaQueryList.matches) {
      typing.setAttribute(
        'style',
        `
              width: ${numChars}ch;
              max-width: 100%;
              animation: typing 2s steps(${numChars}), blink 0.5s step-end infinite alternate;
              border-right: 3px solid;
              white-space: nowrap;
              overflow: hidden;
          `
      );
    } else {
      typing.removeAttribute('style');
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

    const typings = document.getElementsByClassName('typing');
    [...typings].forEach(checkTyping);
  };

  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout);
    }

    resizeTimeout = window.setTimeout(() => {
      const typings = document.getElementsByClassName('typing');
      [...typings].forEach(checkTyping);
    }, 1000);
  });
};
