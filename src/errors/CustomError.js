export default class CustomError {
  static createError({ name, cause, message, code }) {
    const error = new Error(message);
    error.name = name;
    error.cause = cause;
    error.code = code;
    throw error;
  }
}   