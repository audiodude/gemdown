# gemdown
A Javascript library for rendering Markdown files in the Gemini .gmi format

# Installation

```bash
yarn install
```

# Running the tests

From the main project directory, run:

```bash
npx jasmine spec/goldens.spec.js
```

# Adding a new golden test

Add a markdown file in testdata/markdown and the expected Gemini output in testdata/gemini.
The should have the same file "slug", aka name without extension.

In golden.spec.js, add this slug to the following line:

```js
const SLUGS = ['sample', 'html_blocks'];
```
