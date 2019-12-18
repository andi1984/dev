// https://stackoverflow.com/a/41975448/778340
export { };
const path = require("path");

module.exports = {
  MARKDOWN_FOLDER: path.resolve("./md"),
  DISTRIBUTION_FOLDER: path.resolve("./dist"),
  TEMPLATE_FOLDER: path.resolve("./templates")
};
