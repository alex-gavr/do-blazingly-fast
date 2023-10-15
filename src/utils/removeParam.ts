function removeParam(key: string, sourceURL: string): string {
  const url = new URL(sourceURL);
  url.searchParams.delete(key);
  return url.toString();
}
