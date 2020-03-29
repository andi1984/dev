// https://stackoverflow.com/a/41975448/778340
export {};

/**
 * Returns frontmatter lines array based on given frontmatter string
 * @param {string} frontmatterString
 * @returns {array<string>}
 */
const frontmatterLines = (frontmatterString: string): string[] =>
  frontmatterString.split("\n");

/**
 * Based on given (multi-line) frontmatter string and tag, return the frontmatter line matching the tag.
 * @param {string} frontmatterString
 * @param {string} tag
 * @returns {string|undefined}
 */
const findFrontmatterTag = (
  frontmatterString: string,
  tag: string
): string | undefined => {
  return frontmatterLines(frontmatterString).find(
    line => line.indexOf(tag) !== -1
  );
};

/**
 * Returns frontmatter tag for a given frontmatter line.
 * @param {string} frontmatterLine 
 * @returns {string}
 */
const frontmatterTag = (frontmatterLine: string): string =>
  frontmatterLine.split(":")[0].trim();

/**
 * Returns string based value of a frontmatter line.
 * @param {string} frontmatterLine
 * @returns {string}
 */
const frontmatterValue = (frontmatterLine: string): string =>
  frontmatterLine.split(":").slice(1).join(':').trim();

module.exports = {
  findFrontmatterTag,
  frontmatterLines,
  frontmatterTag,
  frontmatterValue
};
