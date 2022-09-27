// Place script code for routes here
const router = require("express").Router();
const acctRoutes = require("./account-routes");
const reviewRoutes = require("./review-route");

router.use("/user", acctRoutes)
router.use("/reviews", reviewRoutes);

module.exports = router;