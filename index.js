export const geminiRenderer = {
  // Block-level elements
  code(code, infostring, escaped) {
    return `\n${code}\n`;
  },
  blockquote(quote) {
    return `\n> ${quote.trim().split('\n').join('\n> ')}\n`;
  },
  html(html) {
    return '';
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
    return `=> ${href} ${text}`;
  },
  image(href, title, text) {
    return '';
  },
  text(text) {
    return text;
  },

  postProcess(gemText) {
    return gemText.trimStart();
  },
};
