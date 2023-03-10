// Extend AppError class with buildIn Error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode 
    this.status = `${this.statusCode}`.startsWith('4') ? 'Fail' : 'Error'
    // Template string to convert it to String
    this.isOperational = true
  }
}

module.exports = AppError
