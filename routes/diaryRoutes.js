const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const diaryController = require("../controllers/diaryController");

const router = express.Router();

router.use(isAuthenticated);

router.post("/add-timeline", diaryController.addPage);

router.patch("/update-timeline/:id", diaryController.updatePage);

module.exports = router;
