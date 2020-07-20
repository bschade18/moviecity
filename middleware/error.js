const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  console.log(err.stack);

  // Bad mongoose ObjectId
  if (err.name === 'CastError') {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Duplicate field value key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorReponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
