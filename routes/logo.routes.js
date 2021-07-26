const express = require("express");

const Logo = require("../models/Logo.model");

const upload = require("../utils/fileUpload");
const AppError = require("../utils/AppError");

const router = express.Router();

router.post("/add", upload.array("images", 2), async (req, res, next) => {
  console.log(req.files);

  try {
    const logo = new Logo({
      avatar: req.files[0].path,
      cover: req.files[1].path,
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
