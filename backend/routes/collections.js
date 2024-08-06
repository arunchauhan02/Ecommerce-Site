const express = require("express");
const { byCollectionProducts, searchByName } = require("../controllers/productcontroller");
const router = express.Router();

router.route("/collections/:id").get(byCollectionProducts);
router.route("/search").get(searchByName);

module.exports = router;