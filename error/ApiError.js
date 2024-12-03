// utils/ApiError.js
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = this.constructor.name;
    this.isOperational = isOperational; // Flag for operational errors (handled by you)
    
    // Capture stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }

  // Static methods for common HTTP error responses
  static OK(message) {
    return new ApiError(200, message);
  }
  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static notFound(message) {
    return new ApiError(404, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
