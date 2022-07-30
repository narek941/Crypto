export const clearNullAndUndefinedFromObj = (obj: any) => {
  for (const key in obj) {
    if (
      obj[key] === undefined ||
      obj[key] === null ||
      obj[key][0] === undefined ||
      obj[key][0] === null
    ) {
      delete obj[key];
    }
  }
  return obj;
};
