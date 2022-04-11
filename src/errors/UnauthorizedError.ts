class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default UnauthorizedError;
