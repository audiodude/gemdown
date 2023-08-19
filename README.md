# gemdown

A Javascript library for rendering Markdown files in the Gemini .gmi format

# Overview

[Gemini](https://gemini.circumlunar.space/) is a recent text-based internet protocol that aims to be more robust than Gopher but more lightweight than the web, and doesn't seek to replace either. You need a special [Gemini client](https://github.com/kr1sp1n/awesome-gemini#clients) to connect to "Gemini capsules" in "Gemspace" (such as `gemini://gemini.circumlunar.space/`).

Gemini capsules are authored using "Gemtext", which you can [read the description of](https://gemini.circumlunar.space/docs/gemtext.gmi). For a list of many Gemini related projects and sites, see [Awesome Gemini](https://github.com/kr1sp1n/awesome-gemini).

According to [Wikipedia](https://en.wikipedia.org/wiki/Markdown), [Markdown](https://daringfireball.net/projects/markdown/) is "a lightweight markup language for creating formatted text using a plain-text editor". Markdown is commonly used in [Static Site Generators](https://www.cloudflare.com/learning/performance/static-site-generator/) to store the source code for pages such as blog posts without making the author write full HTML markup.

Gemdown, then, is a library that takes Markdown input and outputs Gemtext. It is designed to be used in conjunction with a static site generator in order to create a Gemini mirror of an HTTP website (HTTP/Gemini mirrors of the same content is common amongst the Gemini community).

# Installation

The `gemdown` package is available on NPM and can be installed with `npm install gemdown` or `yarn add gemdown`.

## ECMAScript modules

The `gemdown` package uses [ECMAScript modules](https://nodejs.org/api/esm.html), so it must be used with `import` statements.

# Usage

For now, this package exposes a single function called `md2gemini`. It takes a string containing raw Markdown text and returns a string which contains raw gemtext.

From `example.js`:

```
import { md2gemini } from 'gemdown';

const markdown = `This is some [Markdown](https://daringfireball.net/projects/markdown/)! Links are extracted to the end of the paragraph.

Here's a second paragraph! Things like **bold** and _italic_ are ignored.`;

const gemtext = md2gemini(markdown);
console.log(gemtext);
```

# Development

## Installation

```bash
yarn install
```

## Running the tests

From the main project directory, run:

```bash
npm test
```

## Adding a new golden test

Add a markdown file in testdata/markdown and the expected Gemini output in testdata/gemini.
The should have the same file "slug", aka name without extension.

In golden.spec.js, add this slug to the following line:

```js
const SLUGS = ['sample', 'html_blocks'];
```
