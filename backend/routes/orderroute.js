const express = require("express");
const { isauthenticated, authorizeRoles } = require("../middleware/auth");
const {newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder} = require("../controllers/ordercontroller")
const router = express.Router();

router.route("/order/new").post(isauthenticated,newOrder);

router.route("/order/:id").get(isauthenticated,getSingleOrder)

router.route("/orders/me").post(isauthenticated,myOrders);

router.route("/admin/orders").get(isauthenticated,authorizeRoles("admin"),getAllOrders)

router.route("/admin/order/:id").put(isauthenticated,authorizeRoles("admin"),updateOrder).delete(isauthenticated,authorizeRoles("admin"),deleteOrder);


module.exports = router
