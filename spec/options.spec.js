import { md2gemini } from "../lib/index.js";

describe("renderBoldItalic", () => {
  const markdown = `This is **bold**. This is _italic_.`;

  describe("when true", () => {
    it("renders with the markings preserved", () => {
      const actual = md2gemini(markdown, { renderBoldItalic: true });
      expect(actual).toEqual("This is **bold**. This is _italic_.\n");
    });

    describe("and the markdown has alternate usage", () => {
      it("does not preserve the alternative", () => {
        const markdown = `This is __bold__. This is *italic*.`;
        const actual = md2gemini(markdown, { renderBoldItalic: true });
        expect(actual).toEqual("This is **bold**. This is _italic_.\n");
      });
    });
  });

  describe("when false", () => {
    it("renders with the markings removed", () => {
      const actual = md2gemini(markdown, { renderBoldItaic: false });
      expect(actual).toEqual("This is bold. This is italic.\n");
    });
  });

  describe("when absent", () => {
    it("renders with the markings removed", () => {
      const actual = md2gemini(markdown);
      expect(actual).toEqual("This is bold. This is italic.\n");
    });
  });
});

describe("useWikiLinks", () => {
  describe("when true", () => {
    it("renders with wiki links replsced by gemini links", () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, { useWikiLinks: true });
      expect(actual).toEqual(
        "This is some markdown text[1] with wikilinks[2].\n\n" +
          "=> markdown 1: markdown\n" +
          "=> wikilinks 2: wikilinks\n",
      );
    });
  });

  describe("when false", () => {
    it(`doesn't render with wiki links replsced by gemini links`, () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, { useWikiLinks: false });
      expect(actual).toEqual(
        "This is [[markdown|some markdown text]] with [[wikilinks]].\n",
      );
    });
  });

  describe("when absent", () => {
    it(`doesn't render with wiki links replsced by gemini links`, () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown);
      expect(actual).toEqual(
        "This is [[markdown|some markdown text]] with [[wikilinks]].\n",
      );
    });
  });
});

describe("wikiLinksPrefix", () => {
  describe("when useWikiLinks is not set", () => {
    it("does nothing", () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, { wikiLinksPrefix: "foo/bar/" });
      expect(actual).toEqual(
        "This is [[markdown|some markdown text]] with [[wikilinks]].\n",
      );
    });
  });

  describe("when set", () => {
    it("outputs wiki links with the prefix", () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, {
        useWikiLinks: true,
        wikiLinksPrefix: "foo/bar/",
      });
      expect(actual).toEqual(
        "This is some markdown text[1] with wikilinks[2].\n\n" +
          "=> foo/bar/markdown 1: foo/bar/markdown\n" +
          "=> foo/bar/wikilinks 2: foo/bar/wikilinks\n",
      );
    });
  });

  describe("when set to empty string", () => {
    it(`doesn't output wiki links with the prefix`, () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, {
        useWikiLinks: true,
        wikiLinksPrefix: "",
      });
      expect(actual).toEqual(
        "This is some markdown text[1] with wikilinks[2].\n\n" +
          "=> markdown 1: markdown\n" +
          "=> wikilinks 2: wikilinks\n",
      );
    });
  });

  describe("when not set", () => {
    it(`doesn't output wiki links with the prefix`, () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, {
        useWikiLinks: true,
      });
      expect(actual).toEqual(
        "This is some markdown text[1] with wikilinks[2].\n\n" +
          "=> markdown 1: markdown\n" +
          "=> wikilinks 2: wikilinks\n",
      );
    });
  });
});

describe("wikiLinksSuffix", () => {
  describe("when useWikiLinks is not set", () => {
    it("does nothing", () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, { wikiLinksSuffix: ".html" });
      expect(actual).toEqual(
        "This is [[markdown|some markdown text]] with [[wikilinks]].\n",
      );
    });
  });

  describe("when set", () => {
    it("outputs wiki links with the suffix", () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, {
        useWikiLinks: true,
        wikiLinksSuffix: ".html",
      });
      expect(actual).toEqual(
        "This is some markdown text[1] with wikilinks[2].\n\n" +
          "=> markdown.html 1: markdown.html\n" +
          "=> wikilinks.html 2: wikilinks.html\n",
      );
    });
  });

  describe("when set to empty string", () => {
    it(`doesn't output wiki links with the prefix`, () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, {
        useWikiLinks: true,
        wikiLinksSuffix: "",
      });
      expect(actual).toEqual(
        "This is some markdown text[1] with wikilinks[2].\n\n" +
          "=> markdown 1: markdown\n" +
          "=> wikilinks 2: wikilinks\n",
      );
    });
  });

  describe("when not set", () => {
    it(`doesn't output wiki links with the prefix`, () => {
      const markdown = `This is [[markdown|some markdown text]] with [[wikilinks]].`;
      const actual = md2gemini(markdown, {
        useWikiLinks: true,
      });
      expect(actual).toEqual(
        "This is some markdown text[1] with wikilinks[2].\n\n" +
          "=> markdown 1: markdown\n" +
          "=> wikilinks 2: wikilinks\n",
      );
    });
  });
});
