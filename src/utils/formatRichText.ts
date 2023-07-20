export default function formatRichText(paragraph: string, accentTag: string, outerTag: string): string {
  const tagRegex = new RegExp(`<${accentTag}>|<\/${accentTag}>`, 'g');
  const tags = paragraph.match(tagRegex);

  let html = `<${outerTag}>`;

  if (tags) {
    let tagIndex = 0;
    paragraph.split(tagRegex).forEach((text) => {
      html += text;
      if (tagIndex < tags.length) {
        html += tags[tagIndex];
        tagIndex++;
      }
    });
  } else {
    html += paragraph;
  }

  html += `</${outerTag}>`;

  return html;
}
