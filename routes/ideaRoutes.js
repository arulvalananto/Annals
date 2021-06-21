const express = require("express");

const router = express.Router();

router.get("/all", (req, res, next) => {});

router.post("/add", (req, res, next) => {});

router.patch("/update/:id", (req, res, next) => {});

router.delete("/delete/:id", (req, res, next) => {});

module.exports = router;
