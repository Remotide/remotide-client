export const truncate = (str, len) =>
  str?.length
    ? str.length <= len
      ? `${str.slice(0, len)}`
      : `${str.slice(0, len)}...`
    : null;