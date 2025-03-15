class AppError extends Error {
    constructor(message, statusCode) {
      super(Array.isArray(message) ? message.join(", ") : [message]);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true; // to differentiate between operational errors and programming errors
      this.messages = Array.isArray(message) ? message : [message];
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class BadRequestError extends AppError {
    constructor(messages = ["Bad request"]) {
      super(messages, 400);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(messages = ["Not found"]) {
      super(messages, 404);
    }
  }
  
  class UnauthorizedError extends AppError {
    constructor(messages = ["Unauthorized"]) {
      super(messages, 401);
    }
  }
  
  class ForbiddenError extends AppError {
    constructor(messages = ["Forbidden"]) {
      super(messages, 403);
    }
  }
  
  class InternalServerError extends AppError {
    constructor(messages = ["Internal Error"]) {
      super(messages, 500);
    }
  }
  
  export {
    AppError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    InternalServerError,
  };
  