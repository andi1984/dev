export {};
require("dotenv").config();
const fs = require("fs");
const { resolve } = require("path");
const { readdir } = require("fs").promises;
const { sync: syncRmRf } = require("rimraf");
const MARKDOWN_FOLDER = require("./utils/constants").MARKDOWN_FOLDER;
const DISTRIBUTION_FOLDER = require("./utils/constants").DISTRIBUTION_FOLDER;
const renderMarkdownFile = require("./utils/renderMDFile");

async function* getFiles(dir: string): AsyncGenerator<string> {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

// Step 1: Clear output directory
syncRmRf(DISTRIBUTION_FOLDER);

// Step 2: Create files
(async () => {
  for await (const f of getFiles(MARKDOWN_FOLDER)) {
    renderMarkdownFile(f);
  }
})();
