import { parse } from 'node-html-parser';

export const renderer = {
  // Block-level elements
  code(code, infostring, escaped) {
    return `\n${code}\n`;
  },
  blockquote(quote) {
    return `\n> ${quote.trim().split('\n').join('\n> ')}\n`;
  },
  html(html) {
    const root = parse(html);
    return root.textContent;
  },
  heading(text, level, raw, slugger) {
    return `\n${'#'.repeat(level)} ${text}\n`;
  },
  hr() {
    return '-----\n';
  },
  list(body, ordered, start) {
    return `\n${body}`;
  },
  listitem(text, task, checked) {
    return `* ${text}\n`;
  },
  checkbox(checked) {
    return checked ? '☑' : '◻';
  },
  paragraph(text) {
    return `\n${text}\n`;
  },
  table(header, body) {
    return body;
  },
  tablerow(content) {
    return content;
  },
  tablecell(content) {
    return content;
  },

  //Inline-level elements
  strong(text) {
    return text;
  },
  em(text) {
    return text;
  },
  codespan(code) {
    return code;
  },
  br() {
    return '\n';
  },
  del(text) {
    return text;
  },
  link(href, title, text) {
    return `${text}[LINK OMITTED!]`;
  },
  image(href, title, text) {
    return '[IMAGE OMITTED!]';
  },
  text(text) {
    return text;
  },
};

function extractLinks(tokens, startIndex = 0) {
  function extractLinksInner(tokens) {
    let links = [];
    for (let i = 0; i < tokens.length; i++) {
      const child = tokens[i];
      if (child.type === 'link') {
        const text = `${child.text}[${++startIndex}]`;
        tokens.splice(i, 1, { type: 'text', raw: text, text });
        links.push(child);
      } else if (child.tokens) {
        links = links.concat(extractLinksInner(child.tokens));
      }
    }
    return links;
  }

  return extractLinksInner(tokens);
}

export function walkTokens(token) {
  let links = [];
  if (token.type === 'list') {
    links = links.concat(extractLinks(token.items, links.length));
  } else if (token.tokens) {
    links = links.concat(extractLinks(token.tokens, links.length));
  }

  if (links.length === 0) {
    return;
  }

  let outputLinks = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    outputLinks.push(`=> ${link.href} ${i + 1}: ${link.href}`);
  }

  let start;
  if (token.type == 'list') {
    start = '\n';
  } else {
    start = '\n\n';
  }

  const linkText = start + outputLinks.join('\n');
  const newToken = { type: 'text', raw: linkText, text: linkText };

  if (token.type == 'list') {
    token.items[token.items.length - 1].tokens.push(newToken);
  } else if (token.tokens) {
    token.tokens.push(newToken);
  }
}

export function postprocess(html) {
  html = html.replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&amp;', '&');
  return html.trimStart();
}

export function preprocessWikiLinks(markdown) {
  if (!markdown) {
    return markdown;
  }

  const regexWikiLink = /\[\[([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g;
  const matches = [...markdown.matchAll(regexWikiLink)];

  for (const match of matches) {
    const parts = match[0].slice(2, -2).split('|');
    const text = (parts[1] || parts[0]).trim();
    // TODO: Allow specifying prefixes and suffixes for the output URL.
    const url = parts[0].trim();
    markdown = markdown.replace(match[0], `[${text}](${url})`);
  }
  return markdown;
}