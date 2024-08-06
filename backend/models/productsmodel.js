const mongoose = require("mongoose");

const productsschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product description"],
        maxlength:[8,"Price cannot exceed 8 digits"]
    },
    discount:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0,

    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter products stock"],
        maxlength:[4,"Stock cannot exceed 10000"]
    },
    numofreviews:{
        type:String,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                // required:true
            },
            image:{
                type:String
            },
            name:{
                type:String,
                // required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                // required:true
            },
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        deafult:Date.now()
    }
})

module.exports = mongoose.model("Product",productsschema)