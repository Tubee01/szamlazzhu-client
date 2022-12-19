export const omitEmpty = (obj: any) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] != null) {
      (acc as any)[key] = obj[key];
    }

    return acc;
  }, {});
};
