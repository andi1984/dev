const path = require("path");
const fs = require("fs");

const minify = require("html-minifier").minify;
const Twig = require("twig");
const isAbsoluteURL = require("./url").isAbsoluteURL;
const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt({
    replaceLink: function(link) {
      return isAbsoluteURL(link) || link.indexOf(".html") !== -1
        ? link
        : `${link}.html`;
    }
  }).use(require("markdown-it-replace-link"));

const MARKDOWN_FOLDER = require("./constants").MARKDOWN_FOLDER;
const DISTRIBUTION_FOLDER = require("./constants").DISTRIBUTION_FOLDER;

module.exports = file => {
  const fileName = path.basename(file, ".md");
  const twigTemplate = "./templates/main.twig";
  // Read in MD file synchronously.
  const mdString = fs.readFileSync(path.join(MARKDOWN_FOLDER, file), "utf8");

  if (!fs.existsSync(DISTRIBUTION_FOLDER)) {
    fs.mkdirSync(DISTRIBUTION_FOLDER);
  }

  Twig.renderFile(
    twigTemplate,
    {
      page_title: "foo",
      content: md.render(mdString)
    },
    (err, html) => {
      return new Promise((resolve, reject) => {
        if (err) {
          reject(err);
        }

        fs.writeFile(
          path.join(DISTRIBUTION_FOLDER, `${fileName}.html`),
          minify(html, { collapseWhitespace: true }),
          writeErr => {
            if (writeErr) {
              reject(writeErr);
            } else {
              resolve();
            }
          }
        );
      });
    }
  );
};
