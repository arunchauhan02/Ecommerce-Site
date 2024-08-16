const Order = require("../models/ordermodel")
const ErrorHandler = require("../util/errorhandler");
const catchAsyncError = require("../middleware/catchasyncerrors");
const Product = require("../models/productsmodel");

exports.newOrder = catchAsyncError(async(req,res,next)=>{
    console.log(req.body.orderItems,"pop")
    const {shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })


    res.status(201).json({
        success:true,
        order
    })
})


exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("order not found with this is",404));
    }

    res.status(200).json({
        success:true,
        order
    })
})


exports.myOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});

    if(!orders){
        return next(new ErrorHandler("order not found with this is",404));
    }

    res.status(200).json({
        success:true,
        orders
    })
})

//get all orders
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(ord=>{totalAmount+=ord.totalPrice})

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})


//update order status
exports.updateOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("order not found with this id",404));
    }
    
    if(order.orderStatus === "Delivered"){
        return next( new ErrorHandler("You have already delivered thid order",400));
    }

    
    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (o)=>{
            await updateStock(o.product,o.qunatity)
        })
    }
    order.orderStatus = req.body.status;
    
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,

    })

})

async function updateStock(id,quatity){
    const product = await Product.findById(id);

    product.stock -= quatity;

    await product.save({validateBeforeSave:false});
}

//delete order
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findByIdAndDelete(req.params.id);

    if(!order){
        return next(new ErrorHandler("order not found with this id",404));
    }


    res.status(200).json({
        success:true,

    })

})
