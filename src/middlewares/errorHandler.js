const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
} = require("sequelize");
const AppError = require("../utils/AppError");

const handleSequelizeUniqueConstraintError = (err) => {
  const message = `Duplicate field value: ${err.message}`;
  return new AppError(message, 400);
};

const handleSequelizeValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleSequelizeForeignKeyConstraintError = (err) => {
  const message = "Foreign key constraint violation"; // You might want to be more specific if needed
  return new AppError(message, 400);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // Copy prototype chain for instanceof checks if needed, though spreading often loses it.
  // Better to check 'err' for connection/prototype issues, or re-assign prototype.
  // For Sequelize errors, usually checking the constructor name or instanceof on the original 'err' is safer before spreading.

  // However, simple spread might handle properties but not the class type for instanceof.
  // Strategy: Inspect 'err' checks first or construct 'error' differently.
  // Let's modify 'error' based on 'err' type.

  if (err instanceof UniqueConstraintError)
    error = handleSequelizeUniqueConstraintError(err);
  if (err instanceof ValidationError)
    error = handleSequelizeValidationError(err);
  if (err instanceof ForeignKeyConstraintError)
    error = handleSequelizeForeignKeyConstraintError(err);

  // Ensure default values are set if they weren't set by specific handlers
  error.statusCode = error.statusCode || err.statusCode || 500;
  error.status = error.status || err.status || "error";

  // console.error(err.stack);

  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      success: false,
      status: error.status,
      message: error.message,
      error: error,
      stack: err.stack,
      timestamp: new Date().toISOString(),
    });
  } else {
    // Production
    if (error.isOperational) {
      res.status(error.statusCode).json({
        success: false,
        status: error.status,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Programming or other unknown error: don't leak error details
      console.error("ERROR 💥", err);
      res.status(500).json({
        success: false,
        status: "error",
        message: "Something went very wrong!",
        timestamp: new Date().toISOString(),
      });
    }
  }
};

module.exports = errorHandler;
