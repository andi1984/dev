import { URL } from "url";
const path = require("path");
const fs = require("fs");

const { generateURL } = require("./url");
const frontmatterUtils = require("./frontmatter");
const MARKDOWN_FOLDER = require("./constants").MARKDOWN_FOLDER;
const TEMPLATE_FOLDER = require("./constants").TEMPLATE_FOLDER;

export interface File {
  name: String;
  abs: String;
  rel: String;
}

export interface Site {
  title: String;
  template: String;
  html: String;
  file: File;
  url: URL;
}

const MarkdownIt = require("markdown-it"),
  md = (frontmatterCallback: Function) =>
    new MarkdownIt({
      replaceLink: generateURL
    })
      .use(require("markdown-it-replace-link"))
      .use(require("markdown-it-front-matter"), frontmatterCallback);

const getSiteObject = (absoluteFilePath: string): Site => {
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

  return {
    title,
    template: twigTemplate,
    html: htmlOutput,
    file: {
      name: fileName,
      abs: absoluteFilePath,
      rel: relativeFileFolderToMDFolder
    },
    url: generateURL(
      path.relative(MARKDOWN_FOLDER, absoluteFilePath).replace(".md", "")
    )
  };
};

module.exports = { getSiteObject };
