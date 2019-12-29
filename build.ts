// https://stackoverflow.com/a/41975448/778340
export {};

require("dotenv").config();
const { sync: syncRmRf } = require("rimraf");
const MARKDOWN_FOLDER = require("./utils/constants").MARKDOWN_FOLDER;
const DISTRIBUTION_FOLDER = require("./utils/constants").DISTRIBUTION_FOLDER;
const renderMarkdownFile = require("./utils/renderMDFile");
const { getFiles } = require("./utils/generators");
const { getSiteObject } = require("./utils/md");

// Step 1: Clear output directory
syncRmRf(DISTRIBUTION_FOLDER);

// Step 2: Create files
(async () => {
  let sites = [];
  for await (const f of getFiles(MARKDOWN_FOLDER)) {
    sites.push(getSiteObject(f));
  }

  for (const site of sites) {
    renderMarkdownFile(site, sites);
  }
})();
