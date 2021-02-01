function isPromise(value: any): boolean {
  if (value instanceof Promise) {
    return true;
  }

  return false;
}

export default isPromise;
