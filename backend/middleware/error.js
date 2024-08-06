const ErrorHandler = require("../util/errorhandler")

module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal server error"

    if(err.message === "CasteError"){
        const message = `Resource not found: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new  ErrorHandler(message,400);
    }


    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }

    if(err.name === "TokenExpiredError"){
        const message = `Json web token is Expired, try again`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statuscode).json({
        success:false,
        error:err.message
    })
}