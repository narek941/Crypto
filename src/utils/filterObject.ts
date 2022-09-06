const filterObject = (obj: Record<string, string>, str: string) => {
  const newObj = Object.keys(obj)
    .filter((key) => key !== str)
    .reduce((item: typeof obj, key) => {
      item[key] = obj[key];
      return item;
    }, {});
  return newObj;
};
export default filterObject;
