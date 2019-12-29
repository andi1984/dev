// https://stackoverflow.com/a/41975448/778340
export { };
  
const isAbsoluteURL = (url: string) => {
  return url.indexOf("://") > 0 || url.indexOf("//") === 0;
};

const generateURL = (link: string): string => {
  return Boolean(process.env.PRETTY_URLS) ||
    isAbsoluteURL(link) ||
    link.indexOf(".html") !== -1
    ? link
    : `${link}.html`;
};

module.exports = {
  // https://stackoverflow.com/a/38979205/778340
  isAbsoluteURL,
  generateURL
};
