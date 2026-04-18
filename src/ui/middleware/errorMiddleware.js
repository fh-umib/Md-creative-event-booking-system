function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Unexpected server error.';

  console.error('ERROR:', {
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message,
    stack: error.stack,
  });

  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorMiddleware;