,const User = require("../models/usermodel");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncError = require("../middleware/catchasyncerrors");
const sendtoken = require("../util/jwttoken");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { url } = require("inspector");


exports.createUser = catchAsyncError(async(req,res)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        use_filename:true,
        resource_type:"auto",
        folder:"avatars",
        width:1000,
        crop:"scale"
    })

    const {name,email,password} = req.body;
    
    
        const user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.url
            },
        })
    

    sendtoken(req,user,201,res);
})

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    
    const {email,password} = req.body;
    
    if(!email || !password){
        return next(new ErrorHandler("Please Enter email and password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMAtched = await user.comaparePassword(password);

    if(!isPasswordMAtched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendtoken(req,user,200,res);

})

exports.LogoutUser = catchAsyncError(async (req,res,next)=>{

    res.cookie("token",null,{
        expirein:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logout Successfully"
    })
})


exports.forgetpassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("No user found",404));
    }


    //get resetpassword token
    const resettoken = await user.getResetPasswordToken();
    
    await user.save({validateBeforeSave:false});
    
    const resetPasswordUrl =`${req.protocol}://${req.get("host")}/password/reset/${resettoken}`;
    
    const message = `Your password reset Token is temp :- \n\n ${resetPasswordUrl} \n\n if you have not request this email then, please ignore it`;
    
    try{
        
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery",
            message
        },(error)=>{console.log(error)});

        res.status(200).json({
            success:true,
            message:`email sent ${user.email} to successfully`
        })
        

    }catch(erorr){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save();

        return next(new ErrorHandler(erorr.message,500))
    }
})

exports.resetpassword = catchAsyncError(async (req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    console.log(req.params.token,"   from reset token");
    console.log(resetPasswordToken," from reset password");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });


    if(!user){
        return next(new ErrorHandler("reset Password token is invalid or has been expired",400));
    }
   
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendtoken(req,user,200,res);
})

exports.getUserdetails = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    });
})

exports.updatePassword = catchAsyncError(async (req,res,next)=>{
    
    const user = await User.findById(req.user.id).select("+password");

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    
    const isPasswordMatched = await user.comaparePassword(oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }
    if(newPassword != confirmPassword){
        return next(new ErrorHandler("password doesn't matched",400))
    }

    user.password = newPassword;
    await user.save();

    sendtoken(req,user,200,res);
})


exports.updateProfile = catchAsyncError(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})

//get all users
exports.getAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await User.find();

    res.status(200).json({success:true,users});
})

exports.getUserDetails = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not exist with id:${req.params.id}`,200));
    }

    res.status(200).json({success:true,user});
})


exports.updateUserRole = catchAsyncError(async(req,res)=>{
    const updatedinfo = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }

    await User.findByIdAndUpdate(req.params.id,updatedinfo,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        message:"User updated successfully"
    })
})

exports.deleteUser = catchAsyncError(async(req,res)=>{

    console.log(req.params);
    const user = await User.findById(req.params.id);
    await User.deleteOne({_id:req.params.id});

    if(!user){
        return next(new ErrorHandler(`user not exist with id: ${req.params.id}`,));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    

    
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})
