export const getRandomZone = (zone: number[]) => {
    return zone[Math.floor(Math.random() * zone.length)];
}