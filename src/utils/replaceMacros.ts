export function hasMacros(url: string): boolean {
  const regex = /{([^}]+)}/g;
  return regex.test(url);
}

export function replaceMacrosWithEmptyString(url: string): void {
  const regex = /{([^}]+)}/g;
  const hasMacros = regex.test(url);

  if (hasMacros) {
    const updatedURL = url.replace(regex, ' ');
    window.location.href = updatedURL;
  }
}
