/**
 * Returns frontmatter lines array based on given frontmatter string
 * @param {string} frontmatterString 
 * @returns {array}
 */
const frontmatterLines = frontmatterString => frontmatterString.split("\n");

/**
 * Based on given (multi-line) frontmatter string and tag, return the frontmatter line matching the tag.
 * @param {string} frontmatterString 
 * @param {string} tag 
 * @returns {string|undefined}
 */
const findFrontmatterTag = (frontmatterString, tag) => {
  return frontmatterLines(frontmatterString).find(
    line => line.indexOf(tag) !== -1
  );
};

/**
 * Returns string based value of a frontmatter line.
 * @param {string} frontmatterLine 
 * @returns {string}
 */
const frontmatterValue = frontmatterLine => frontmatterLine.split(":")[1].trim();

module.exports = { findFrontmatterTag, frontmatterLines, frontmatterValue };
