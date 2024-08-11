const ErrorHandler = require("../util/errorhandler");
const catchasyncerrors = require("./catchasyncerrors");
const jwt = require("jsonwebtoken")

const User = require("../models/usermodel")

exports.isauthenticated = catchasyncerrors(async (req,res,next)=>{
    // const {token} = req.cookies;
    const token = req.token
    if(token === "j:null"){
        return next(new ErrorHandler("Please login to access this resourse",401));
    }
    
    const decodeData = jwt.verify(token,process.env.JWT_SECRET);
    
    req.user = await User.findById(decodeData.id);
    
    next();
    
})

exports.authorizeRoles =  (...roles)=>{

    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allwoed to access this resource`,403));
        }
        next();
    };
}
