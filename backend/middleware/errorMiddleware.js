exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found – ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);     // log full stack to console
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(status).json({
      message: err.message,
      // remove stack in production
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };