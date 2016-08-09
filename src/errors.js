function UnauthorizedError () {
  Error.apply(this, arguments);
  this.message = "You are not authorized to perform that action";
};

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;

export { UnauthorizedError }
