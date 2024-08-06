const catchAsyncError = require("../middleware/catchasyncerrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.processPayment = catchAsyncError(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce"
        },
        description:"An Ecommerce Site for mens"
    })

    res.status(200).json({success:true,client_secret:myPayment.client_secret});
})

exports.sendApiKey = catchAsyncError((req,res,next)=>{
    res.status(200).json({
        success:true,
        stripeApiKey:process.env.STRIPE_API_KEY
    });
});