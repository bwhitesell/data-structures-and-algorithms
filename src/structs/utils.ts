function throwErrOnInvalidIdxRef(obj: any) {
  const handler = {
    get(target: any, property: any) {
      if (property in target) {
        return target[property];
      }
      if (isWholeNumber(property)) {
        throw new Error(`Property '${property}' is not defined`);
      }
    }
  };
  return new Proxy(obj, handler);
}

function bindIntPropLookupsToGetMethod(obj: any) {
  const handler = {
    get(target: any, property: any) {
      if (isWholeNumber(property)) {
        return target.get(property)
      }
      return target[property];
    }
  };
  return new Proxy(obj, handler)
}


function isWholeNumber(value: string) {
  return /^-?\d+$/.test(value);
}


export { throwErrOnInvalidIdxRef, bindIntPropLookupsToGetMethod }