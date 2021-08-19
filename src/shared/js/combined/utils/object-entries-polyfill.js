// const entriesPolyFill = (obj) => Object.keys(obj).map(key => [key, obj[key]]);

export function getEntries(obj) {
  return Object.entries ? Object.entries(obj) : Object.keys(obj).map(key => [key, obj[key]]);
}
