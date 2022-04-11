class BadRequestError extends Error {
  errors: string[];

  constructor(errors: string[]) {
    super('Bad Request');
    this.name = this.constructor.name;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BadRequestError;
