const transformMessage = (message) => {
  if (message.startsWith("E11000") && message.includes("Annals.users")) {
    return "User Already Exist";
  } else if (
    message.startsWith("E11000") &&
    message.includes("Annals.journals")
  ) {
    return "One journal per day, but you can update it anytime! Keep writing!";
  }
  return message;
};

module.exports = (err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: transformMessage(err.message),
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
