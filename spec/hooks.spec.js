import { preprocessWikiLinks } from "../lib/extensions.js";

describe("preprocess wiki links hook", () => {
  it("leaves non wiki links alone", () => {
    const markdown = `Non wiki [link](link.html).`;
    const actual = preprocessWikiLinks(markdown);
    expect(actual).toEqual(markdown);
  });

  it("replaces bare wiki links", () => {
    const markdown = `This is a [[bare]] wiki link.`;
    const actual = preprocessWikiLinks(markdown);
    expect(actual).toEqual("This is a [bare](bare) wiki link.");
  });

  it("replaces wiki links with desc text", () => {
    const markdown = `This is a [[foo/bar/baz|descriptive link]].`;
    const actual = preprocessWikiLinks(markdown);
    expect(actual).toEqual("This is a [descriptive link](foo/bar/baz).");
  });

  it("handles multiple links", () => {
    const markdown = "Look at [[link_1|the first link]] and [[link 2]].";
    const actual = preprocessWikiLinks(markdown);
    expect(actual).toEqual(
      "Look at [the first link](link_1) and [link 2](link 2).",
    );
  });
});
