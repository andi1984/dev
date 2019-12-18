const fs = require("fs");
const MARKDOWN_FOLDER = require("./utils/constants").MARKDOWN_FOLDER;
const renderMarkdownFile = require("./utils/renderMDFile");

fs.readdir(MARKDOWN_FOLDER, (err: Error, files: string[]) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(renderMarkdownFile);
});
