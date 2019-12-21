const {
  frontmatterLines,
  findFrontmatterTag,
  frontmatterValue
} = require("../frontmatter");

describe("frontmatterLines", () => {
  test("It returns an array with length being the number of lines", () => {
    expect(
      frontmatterLines(
        `foo: bar,
           foo2: bar2`
      ).length
    ).toBe(2);
  });

  test("Empty lines are NOT removed", () => {
    expect(
      frontmatterLines(
        `
        foo:bar
        `
      ).length
    ).toBe(3);
  });
});

describe("frontmatterValue", () => {
  test("Simple value", () => {
    expect(
      frontmatterValue("title: An apple a day keeps the doctor away!")
    ).toBe("An apple a day keeps the doctor away!");
  });
});

describe("findFrontmatterTag", () => {
  test("It returns undefined if nothing found", () => {
    expect(findFrontmatterTag("", "foo")).toBe(undefined);
  });

  test("It finds the first matching tag", () => {
    expect(
      findFrontmatterTag(
        `
        foo: bar,
        z: xy,
        foo: alsm
      `,
        "foo"
      ).trim()
    ).toBe("foo: bar,");
  });
});
