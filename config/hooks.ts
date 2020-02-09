// https://stackoverflow.com/a/41975448/778340
export {};

import { Site } from "../utils/interfaces";

module.exports = {
  /*
   * Sorts the sites before any further action (e.g. generating the HTML files
   * or the RSS feed.)
   */
  sitesSorting: (siteA: Site, siteB: Site) => {
    // Sort by date
    const dateA = new Date(siteA.meta.date).getTime();
    const dateB = new Date(siteB.meta.date).getTime();

    return dateA - dateB;
  }
};
