type TObject = Record<any, any>

export const deepClone = <T extends TObject = TObject>(obj: T) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj) as TObject;
  Object.keys(clone).forEach(key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]));
};
