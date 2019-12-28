// https://stackoverflow.com/a/41975448/778340
export {};

const path = require("path");
const fs = require("fs");

const minify = require("html-minifier").minify;
const Twig = require("twig");
const isAbsoluteURL = require("./url").isAbsoluteURL;
const frontmatterUtils = require("./frontmatter");

const supportForPrettyUrls = Boolean(process.env.PRETTY_URLS);
console.log('Support for pretty URLs', supportForPrettyUrls);
const MarkdownIt = require("markdown-it"),
  md = (frontmatterCallback: Function) =>
    new MarkdownIt({
      replaceLink: function(link: string): string {
        return Boolean(process.env.PRETTY_URLS) ||
          isAbsoluteURL(link) ||
          link.indexOf(".html") !== -1
          ? link
          : `${link}.html`;
      }
    })
      .use(require("markdown-it-replace-link"))
      .use(require("markdown-it-front-matter"), frontmatterCallback);

const MARKDOWN_FOLDER = require("./constants").MARKDOWN_FOLDER;
const DISTRIBUTION_FOLDER = require("./constants").DISTRIBUTION_FOLDER;
const TEMPLATE_FOLDER = require("./constants").TEMPLATE_FOLDER;

module.exports = (absoluteFilePath: string) => {
  const relativeFileFolderToMDFolder = path.relative(
    MARKDOWN_FOLDER,
    path.dirname(absoluteFilePath)
  );
  const fileName = path.basename(absoluteFilePath, ".md");

  // Set default template to render
  let twigTemplate = "./templates/main.twig";

  // Set default page title to the file name
  let title = fileName;

  // Read in MD file synchronously.
  const mdString = fs.readFileSync(absoluteFilePath, "utf8");
  const htmlOutput = md((frontmatter: string): void => {
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
    (err: Error, html: string) => {
      return new Promise((resolve, reject) => {
        if (err) {
          reject(err);
        }

        const outputFilePath = path.join(
          DISTRIBUTION_FOLDER,
          relativeFileFolderToMDFolder,
          `${fileName}.html`
        );

        // Create folder in case it doesn't exist already.
        if (!fs.existsSync(path.dirname(outputFilePath))) {
          fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
        }

        // Write the file into the folder
        fs.writeFile(
          outputFilePath,
          minify(html, { collapseWhitespace: true }),
          (writeErr: Error) => {
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
