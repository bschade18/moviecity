const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // log to console for dev
  console.log(err.stack.red);

  res.status(error.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
