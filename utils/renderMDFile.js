const path = require("path");
const fs = require("fs");

const minify = require("html-minifier").minify;
const Twig = require("twig");
const isAbsoluteURL = require("./url").isAbsoluteURL;
const frontmatterUtils = require("./frontmatter");
const MarkdownIt = require("markdown-it"),
  md = frontmatterCallback =>
    new MarkdownIt({
      replaceLink: function(link) {
        return isAbsoluteURL(link) || link.indexOf(".html") !== -1
          ? link
          : `${link}.html`;
      }
    })
      .use(require("markdown-it-replace-link"))
      .use(require("markdown-it-front-matter"), frontmatterCallback);

const MARKDOWN_FOLDER = require("./constants").MARKDOWN_FOLDER;
const DISTRIBUTION_FOLDER = require("./constants").DISTRIBUTION_FOLDER;
const TEMPLATE_FOLDER = require("./constants").TEMPLATE_FOLDER;

module.exports = file => {
  const fileName = path.basename(file, ".md");

  // Set default template to render
  let twigTemplate = "./templates/main.twig";

  // Set default page title to the file name
  let title = fileName;

  // Read in MD file synchronously.
  const mdString = fs.readFileSync(path.join(MARKDOWN_FOLDER, file), "utf8");
  const htmlOutput = md(frontmatter => {
    /* HANDLE TEMPLATE FRONTMATTER */
    const templateFrontmatter = frontmatterUtils.findFrontmatterTag(
      frontmatter,
      "template"
    );

    if (templateFrontmatter) {
      const templateName = frontmatterUtils.frontmatterValue(
        templateFrontmatter
      );

      const targetTemplatePath = path.resolve(TEMPLATE_FOLDER, templateName);

      if (fs.existsSync(targetTemplatePath)) {
        twigTemplate = targetTemplatePath;
      }
    }

    /* HANDLE TITLE FRONTMATTER */
    const titleFrontmatter = frontmatterUtils.findFrontmatterTag(
      frontmatter,
      "title"
    );

    if (titleFrontmatter) {
      title = frontmatterUtils.frontmatterValue(titleFrontmatter);
    }
  }).render(mdString);

  if (!fs.existsSync(DISTRIBUTION_FOLDER)) {
    fs.mkdirSync(DISTRIBUTION_FOLDER);
  }

  Twig.renderFile(
    twigTemplate,
    {
      title,
      content: htmlOutput
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
