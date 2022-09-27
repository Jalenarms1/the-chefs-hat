// Place script code for routes here
const router = require("express").Router();
const apiRoutes = require("./api");
const navRoutes = require("./directing-routes.js");

router.use("/", navRoutes);
router.use("/api", apiRoutes);

module.exports = router;