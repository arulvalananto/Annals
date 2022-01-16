const express = require("express");

const { fetchFocus, createFocus } = require("../controllers/focus.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);

router.get("/", fetchFocus);
router.post("/", createFocus);

module.exports = router;
