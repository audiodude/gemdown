import { marked } from 'marked';

import { postprocess, preprocessWikiLinks, renderer, walkTokens } from './extensions.js';

export function md2gemini(markdown, options = {}) {
  marked.use({ hooks: { postprocess, preprocess: preprocessWikiLinks }, renderer, walkTokens });

  if (!!options.useWikiLinks) {
    marked.use({ hooks: { preprocess: preprocessWikiLinks } });
  }

  if (!!options.renderBoldItalic) {
    marked.use({
      renderer: {
        strong(text) {
          return `**${text}**`;
        },
        em(text) {
          return `_${text}_`;
        }
      }
    });
  }

  return marked.parse(markdown);
}