const express = require("express");
const router = express.Router();
const {createUser, loginUser, LogoutUser, forgetpassword, resetpassword, getUserdetails, updatePassword, updateProfile, getAllUsers, getUserDetails, updateUserRole, deleteUser} = require("../controllers/usercontroller");

const {isauthenticated,authorizeRoles} = require("../middleware/auth");

router.route("/register").post(createUser);

router.route("/login").post(loginUser)

router.route("/password/forget").post(forgetpassword);

router.route("/password/reset/:token").put(resetpassword);

router.route("/me").get(isauthenticated,getUserdetails)

router.route("/password/update").put(isauthenticated,updatePassword)

router.route("/me/update").put(isauthenticated,updateProfile)

router.route("/admin/users").get(isauthenticated,authorizeRoles("admin"),getAllUsers)

router.route("/admin/user/:id").get(isauthenticated,authorizeRoles("admin"),getUserDetails)
    .put(isauthenticated,authorizeRoles("admin"),updateUserRole).delete(isauthenticated,authorizeRoles("admin"),deleteUser);

router.route("/logout").get(LogoutUser)

module.exports = router;