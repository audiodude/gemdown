import { md2gemini } from '../lib/index.js';

describe('renderBoldItalic', () => {
  const markdown = `This is **bold**. This is _italic_.`;

  describe('when true', () => {
    it('renders with the markings preserved', () => {
      const actual = md2gemini(markdown, { renderBoldItalic: true });
      expect(actual).toEqual('This is **bold**. This is _italic_.\n')
    });

    describe('and the markdown has alternate usage', () => {
      it('does not preserve the alternative', () => {
        const markdown = `This is __bold__. This is *italic*.`;
        const actual = md2gemini(markdown, { renderBoldItalic: true });
        expect(actual).toEqual('This is **bold**. This is _italic_.\n')
      });
    });
  });

  describe('when false', () => {
    it('renders with the markings removed', () => {
      const actual = md2gemini(markdown, { renderBoldItaic: false });
      expect(actual).toEqual('This is bold. This is italic.\n')
    });
  });

  describe('when absent', () => {
    it('renders with the markings removed', () => {
      const actual = md2gemini(markdown);
      expect(actual).toEqual('This is bold. This is italic.\n');
    })
  });
});