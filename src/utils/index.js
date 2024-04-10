export const truncate = (str, len) =>
  str?.length
    ? str.length <= len
      ? `${str.slice(0, len)}`
      : `${str.slice(0, len)}...`
    : null;
export function calculatePercentageMatch(arr1, arr2) {
  // Convert arrays to sets
  const set1 = new Set(arr1.map(obj => JSON.stringify(obj)));
  const set2 = new Set(arr2.map(obj => JSON.stringify(obj)));

  let count = 0;
  // Iterate over set1 and check if each element is present in set2
  for (const elem of set1) {
    if (set2.has(elem)) {
      count++;
    }
  }

  // Calculate the percentage
  const percentage = (count / set1.size) * 100;

  return percentage;
}