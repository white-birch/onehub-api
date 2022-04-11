class InternalServerError extends Error {
  constructor() {
    super('Internal Server Error');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default InternalServerError;
