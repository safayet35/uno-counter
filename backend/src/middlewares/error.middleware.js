const errorMiddleware = (err, req, res, next) => {
  let { statusCode, message, errors } = err;

  if (!statusCode) statusCode = 500; // Default to 500 if no status code is provided

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors
  });
};

export default errorMiddleware;
