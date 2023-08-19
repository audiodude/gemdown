import { marked } from 'marked';

import { postprocess, renderer, walkTokens } from './extensions.js';

export function md2gemini(markdown) {
  marked.use({ hooks: { postprocess }, renderer, walkTokens });
  return marked.parse(markdown);
}