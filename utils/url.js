module.exports = {
  // https://stackoverflow.com/a/38979205/778340
  isAbsoluteURL: url => {
    return url.indexOf("://") > 0 || url.indexOf("//") === 0;
  }
};
