export const getRandomZoneIfArray = (zone: number[] | number) => {
  if (Array.isArray(zone)) {
    return zone[Math.floor(Math.random() * zone.length)];
  } else {
    return zone;
  }
};
