const express = require("express");

const upload = require("../utils/fileUpload");
const Logo = require("../models/Logo");
const AppError = require("../utils/AppError");

const router = express.Router();

router.post("/add", upload.single("logo"), async (req, res, next) => {
  try {
    const logo = new Logo({
      avatar: req.file.path,
    });

    await logo.save();

    res.status(201).json({ message: "Successfully Added", logo });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

router.get("/get", async (req, res, next) => {
  try {
    const { name } = req.body;

    const logo = await Logo.findOne({
      avatar: { $regex: name, $options: "i" },
    }); // Alternative: {avatar : /${name}/i}

    res.status(200).json({ logo });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

module.exports = router;
