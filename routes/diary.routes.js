const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");

const { addPage, updatePage } = require("../controllers/diary.controller");

const router = express.Router();

router.use(isAuthenticated);

router.post("/add", addPage);

router.patch("/update/:id", updatePage);

module.exports = router;
