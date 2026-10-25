
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Log details on the server
  console.error(err);

  res.status(statusCode).json({
    success: false,
    status: err.status || "error",
    message:
      statusCode >= 500
        ? "Internal server error"
        : err.message,
  });
}

module.exports = errorHandler;