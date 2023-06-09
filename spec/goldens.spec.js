import * as fs from 'fs';
import * as path from 'path';

import { marked } from 'marked';

import { geminiRenderer } from '../index.js';

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
const SLUGS = ['sample'];

async function* allMarkdown() {
  yield* walk(path.join('testdata', 'markdown'));
}

describe('golden files', () => {
  beforeAll(() => {
    marked.use({ renderer: geminiRenderer });
  });

  for (const slug of SLUGS) {
    it(`${slug}.md matches golden`, async () => {
      const markdown = await loadMarkdown(slug);
      const gemini = await loadGemini(slug);
      const actual = geminiRenderer.postProcess(marked.parse(markdown));
      expect(actual).toEqual(gemini);
    });
  }
});
