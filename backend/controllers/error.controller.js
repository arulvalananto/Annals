const transformMessage = (message) => {
  if (message.startsWith("E11000")) {
    return "Email Already Exist";
  }
  return message;
};

module.exports = (err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: transformMessage(err.message),
    stack: err.stack,
  });
};
