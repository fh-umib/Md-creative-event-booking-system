const successResponse = ({
  message = 'Request completed successfully.',
  data = null,
  meta = null,
} = {}) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return response;
};

const errorResponse = ({
  message = 'Something went wrong.',
  errors = null,
} = {}) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return response;
};

module.exports = {
  successResponse,
  errorResponse,
};