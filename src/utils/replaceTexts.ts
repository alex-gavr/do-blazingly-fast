interface Texts {
  [key: string]: string;
}
export function replaceTexts(textsObj: Texts, textArray: string[]): string[] {
  const replacedArray: string[] = [];
  for (const text of textArray) {
    let replacedText = text;
    for (const [key, value] of Object.entries(textsObj)) {
      replacedText = replacedText.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    replacedArray.push(replacedText);
  }
  return replacedArray;
}
