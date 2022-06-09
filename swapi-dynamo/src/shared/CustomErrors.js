class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends ApplicationError {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
  }
}

module.exports = {
  ValidationError,
}