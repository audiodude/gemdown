import * as fs from 'fs';
import { marked } from 'marked';

import { geminiRenderer } from './index.js';

async function test() {
  marked.use({ renderer: geminiRenderer });

  const markdown = await fs.promises.readFile(
    'testdata/markdown/sample.md',
    'utf8'
  );
  console.log(geminiRenderer.postProcess(marked.parse(markdown)));
}

test();
