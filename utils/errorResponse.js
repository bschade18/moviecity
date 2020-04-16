class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // call parent class (Error)
    super(message);

    // anything extra just in the ErrorRespone class, not in the error class
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
