import { marked } from 'marked';

import { postprocess, renderer, walkTokens } from './extensions.js';

export function md2gemini(markdown, options = {}) {
  marked.use({ hooks: { postprocess }, renderer, walkTokens });

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