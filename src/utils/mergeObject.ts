const mergeObjects = (data: Record<string, string>[]) => {
  const result = {};

  data.forEach((obj) => {
    for (const [key, value] of Object.entries(obj)) {
      // @ts-expect-error: Let's ignore a compile error like this unreachable code
      if (result[key]) {
        // @ts-expect-error: Let's ignore a compile error like this unreachable code
        result[key] += Number(value);
      } else {
        // @ts-expect-error: Let's ignore a compile error like this unreachable code
        result[key] = Number(value);
      }
    }
  });
  return result as Record<string, string>;
};
export default mergeObjects;
