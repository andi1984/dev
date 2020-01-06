// https://stackoverflow.com/a/41975448/778340
export {};

require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { sync: syncRmRf } = require("rimraf");
const MARKDOWN_FOLDER = require("./utils/constants").MARKDOWN_FOLDER;
const DISTRIBUTION_FOLDER = require("./utils/constants").DISTRIBUTION_FOLDER;
const renderMarkdownFile = require("./utils/renderMDFile");
const { getFiles, filter } = require("./utils/generators");
const { getSiteObject } = require("./utils/md");
var RSS = require("rss");

// Step 1: Clear output directory
syncRmRf(DISTRIBUTION_FOLDER);

// Step 2: Create files
(async () => {
  let sites = [];

  /* lets create an rss feed */
  var feed = new RSS({
    title: process.env.URL,
    description: `${process.env.URL} - RSS`,
    feed_url: `${process.env.URL}/rss.xml`,
    site_url: process.env.URL,
    image_url: `${process.env.URL}/icon.png`,
    // managingEditor: "Dylan Greene",
    // webMaster: "Dylan Greene",
    // copyright: "2013 Dylan Greene",
    language: "en",
    // categories: ["Category 1", "Category 2", "Category 3"],
    pubDate: new Date().toString(),
    ttl: "60"
  });

  // cache the xml to send to clients
  for await (const f of filter(
    getFiles(MARKDOWN_FOLDER),
    (filePath: string) => {
      const matchesMDFiletype = filePath.match(/^.*\.md$/g);
      return matchesMDFiletype && matchesMDFiletype.length > 0;
    }
  )) {
    sites.push(getSiteObject(f));
  }

  for (const site of sites) {
    renderMarkdownFile(site, sites);
    /* loop over data and add to feed */
    feed.item({
      title: site.title,
      description: site.html,
      url: site.url.href // link to the item
      // author: "Guest Authors", // optional - defaults to feed author property
      // date: "May 27, 2012" // any format that js Date can parse.
    });
  }

  var xml = feed.xml();
  fs.writeFile(
    path.join(DISTRIBUTION_FOLDER, "rss.xml"),
    xml,
    (writeErr: Error) => {
      if (writeErr) {
        throw writeErr;
      }
    }
  );
})();
