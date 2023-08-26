import { Marked } from "marked";

import {
  postprocess,
  preprocessWikiLinks,
  renderer,
  walkTokens,
} from "./extensions.js";

export function md2gemini(markdown, options = {}) {
  const markedOptions = { hooks: { postprocess }, renderer, walkTokens };

  if (!!options.useWikiLinks) {
    markedOptions.hooks.preprocess = preprocessWikiLinks;
  }

  if (!!options.renderBoldItalic) {
    markedOptions.renderer = {
      ...renderer,
      strong(text) {
        return `**${text}**`;
      },
      em(text) {
        return `_${text}_`;
      },
    };
  }

  const marked = new Marked(markedOptions);
  return marked.parse(markdown);
}
