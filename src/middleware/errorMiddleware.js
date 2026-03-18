function errorMiddleware(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || 400;

  res.status(statusCode).json({
    message: error.message || 'Unexpected error'
  });
}

module.exports = errorMiddleware;
