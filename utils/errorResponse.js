class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // call parent class (Error)
    super(message);

    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
