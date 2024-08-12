const Product = require("../models/productsmodel");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncError = require("../middleware/catchasyncerrors");
const {ApiFeatures,productsPerPage} = require("../util/apifeatures");
const cloudinary = require("cloudinary");


exports.createproduct = catchAsyncError(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
    
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        use_filename:true,
        resource_type:"auto",
        folder: "products",
        width:1000,
        crop:"scale",
        quality:100
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  });

exports.updateproduct = catchAsyncError( async(req,res)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  
  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});

    res.status(200).json({
        success:true,
        product
    })
})

exports.getallproducts = catchAsyncError (async (req,res)=>{
    const resultperpage = 5;
    const productcount = await Product.countDocuments(); 
    const apifeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperpage);
    
    const products = await apifeatures.query;
    res.status(200).json({
        success:true,
        products,
        productcount,
        resultperpage
    });
})

exports.getAdminProducts = catchAsyncError (async (req,res)=>{
    
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    });
})
exports.searchByName = catchAsyncError(async(req,res)=>{
    let products = new ApiFeatures(Product.find(),req.query).search();
    products = await products.query;
    if(req.query.keyword.length === 0){
        products = [];
    }
    res.status(200).json({
        success:true,
        products
    })
})
exports.byCollectionProducts = catchAsyncError(async(req,res)=>{
    const resultperpage = 8;
    const productcount = await Product.countDocuments({category:req.params.id});
    const apifeatures = new productsPerPage(Product.find(),req.params,req.query).search().filter().pagination(resultperpage);
    const apifeatures2 = new productsPerPage(Product.find(),req.params,req.query).search().filter();
    let filteredProductCount = await apifeatures2.query;
    filteredProductCount = filteredProductCount.length;
    const products = await apifeatures.query;

    res.status(200).json({
        success:true,
        resultperpage,
        productcount,
        products,
        filteredProductCount
    })
    
})


//To delete a product
exports.deleteproduct= catchAsyncError(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    //deleting images from cloudinary
    for(let i = 0;i<product.images.length;i++){
        console.log(product.images[i].public_id);
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
})

exports.getproductdetails = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    res.status(200).json({
        success:true,
        product
    })
})


//create new review or update review
exports.createProductReview = catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId} = req.body.reviewData;
    const review = {
        image:req.user.avatar.url,
        user:req.user.id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    if(!product){
        return next(new ErrorHandler("Product not found",400));
    }
    const isReviewed = product.reviews.find(rev=>rev.user.toString() === req.user.id.toString());
    if(isReviewed){
        product.reviews.forEach(rev=>{

            if(rev.user.toString() === req.user.id.toString()){
                rev.rating=rating,
                rev.comment = comment
            }
        })
    }
    else{
        product.reviews.push(review)
        product.numofreviews = product.reviews.length
    }
    
    let avg = 0;
    product.reviews.forEach(rev=>{avg += rev.rating});
    product.rating = avg/product.reviews.length
    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })

})

//get all reviews
exports.getProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        review:product.reviews
    })
})

exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach(rev=>{avg += rev.rating});

    let rating = 0;

    if(reviews.length !== 0){
        rating = avg/reviews.length;
    }


    const numofreviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        rating,
        numofreviews
    },{
        new:true,
        runValidators:true,
        userFindAndModfiy:false
    })

    res.status(200).json({
        success:true
    })
})
