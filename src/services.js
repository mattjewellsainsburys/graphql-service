// A "service" is a class that is expected to be consumed by a model
// it MUST implement the "resolve" method, other than that has no restrictions

/**
 * Returns the value passed in to the constructor
 */
export class DummyValueService {
  constructor(retVal) {
    this.retVal = retVal;
  }

  resolve() {
    return this.retVal;
  }
}

/**
 * Returns the computed value of the fn passed into the constructor
 *
 * Any additional arguments passed will be passed to the fn when resolving
 */
export class ValueOfService {
  constructor(fn, ...initArgs) {
    this.fn = fn;
    this.initArgs = initArgs;
  }

  resolve(...runtimeArgs) {
    return this.fn(...this.initArgs, ...runtimeArgs);
  }
}
