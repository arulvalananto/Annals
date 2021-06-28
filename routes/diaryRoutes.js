const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");

const { addPage, updatePage } = require("../controllers/diaryController");

const router = express.Router();

router.use(isAuthenticated);

router.post("/add-timeline", addPage);

router.patch("/update-timeline/:id", updatePage);

module.exports = router;
