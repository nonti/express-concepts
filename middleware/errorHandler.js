//custom error class


class APIError extends Error {
  constructor(message, statusCode){
    super(message)
    this.statusCode = statusCode;
    this.name = 'APIError'; //set err type to 'APIError'
  }
}

const asyncHandler = (fn) => (req,res,next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}


//Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
   console.error(err.stack); //log the error stack trace
   if(err instanceof APIError){
    return res.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    })
   }

   //handle mongoose validation errors
   else if(err.name === 'validaationError'){
    return res.status(400).json({
      status: 'Error',
      message: err.message,
    })
   }else{
    return res.status(500).json({
      status: 'Error',
      message: 'An unexpected error occured',
    })
   }

}

export {APIError, asyncHandler, globalErrorHandler};