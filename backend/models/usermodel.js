const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a valid name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[4,"Name should have atleast 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter a valid email"],
        unique:true,
        vlaidate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a your password"],
        minlength:[8,"password should have atleast 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }  
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcryptjs.hash(this.password,10);
})

//JWT Token
userSchema.methods.getJwtToken = function(){
    
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}

userSchema.methods.comaparePassword = async function (enteredpassword){
    return await bcryptjs.compare(enteredpassword,this.password)
}

userSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
}
module.exports = mongoose.model("User",userSchema)