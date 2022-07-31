export const createObject = (key: string, value: any) => {
  const filter = {};
  filter[key] = value;
  return filter;
};
