import * as fs from 'fs';
import * as path from 'path';

import { marked } from 'marked';

import { postprocess, renderer, walkTokens } from '../lib/extensions.js';
import { md2gemini } from '../lib/index.js';

async function loadMarkdown(slug) {
  const filePath = path.resolve(
    path.join('testdata', 'markdown', `${slug}.md`)
  );
  return fs.promises.readFile(filePath, 'utf8');
}

async function loadGemini(slug) {
  const filePath = path.resolve(path.join('testdata', 'gemini', `${slug}.gmi`));
  return fs.promises.readFile(filePath, 'utf8');
}

// Add new golden slugs here. There should be a <slug>.md file with the input
// and a <slug>.gmi file with the output, in the appropriate folders.
const SLUGS = ['sample', 'html_blocks'];

describe('golden files directly', () => {
  beforeAll(() => {
    marked.use({ hooks: { postprocess }, renderer, walkTokens });
  });

  for (const slug of SLUGS) {
    it(`${slug}.md matches golden`, async () => {
      const markdown = await loadMarkdown(slug);
      const gemini = await loadGemini(slug);
      const actual = marked.parse(markdown);
      expect(actual).toEqual(gemini);
    });
  }
});

describe('golden files with md2gemini', () => {
  beforeAll(() => {
    marked.use({ hooks: { postprocess }, renderer, walkTokens });
  });

  for (const slug of SLUGS) {
    it(`${slug}.md matches golden`, async () => {
      const markdown = await loadMarkdown(slug);
      const gemini = await loadGemini(slug);
      const actual = md2gemini(markdown);
      expect(actual).toEqual(gemini);
    });
  }
});
