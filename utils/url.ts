// https://stackoverflow.com/a/41975448/778340
export { };
module.exports = {
  // https://stackoverflow.com/a/38979205/778340
  isAbsoluteURL: (url: string) => {
    return url.indexOf("://") > 0 || url.indexOf("//") === 0;
  }
};
