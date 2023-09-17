const triggerImpression = (url: string) => {
  fetch(url).catch((e) => console.error(e));
};

export default triggerImpression;
