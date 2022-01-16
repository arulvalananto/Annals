const express = require("express");

const { getDashboardContent } = require("../controllers/common.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);

router.get("/dashboard", getDashboardContent);

module.exports = router;
