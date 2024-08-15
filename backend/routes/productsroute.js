const express = require("express");
const {getallproducts,createproduct,updateproduct,deleteproduct,getproductdetails, createProductReview, getProductReviews, deleteReview, getAdminProducts,getAllProductsWithoutPagination} = require("../controllers/productcontroller");
const {isauthenticated,authorizeRoles} = require("../middleware/auth");
const router = express.Router();


router.route("/products").get(getallproducts);
router.route("/getallproducts").get(getAllProductsWithoutPagination);
router.route("/admin/product/new").post(isauthenticated,authorizeRoles("admin"),createproduct);

router.route("/admin/product/:id").put(isauthenticated,authorizeRoles("admin"),updateproduct)
.delete(isauthenticated,authorizeRoles("admin"),deleteproduct);

router.route("/admin/products").post(isauthenticated,authorizeRoles("admin"),getAdminProducts);

router.route("/product/:id").get(getproductdetails);

router.route("/review").put(isauthenticated,createProductReview);
router.route("/reviews").get(getProductReviews).delete(isauthenticated,deleteReview);

module.exports = router
