class NotFoundError extends Error {
  constructor() {
    super('Not Found');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default NotFoundError;
