const express = require("express");
const router = express();
const testimonialcontroller = require("../controller/testimonialcontroller");
const { authenticate } = require("../conect/auth");
const { upload } = require("../conect/multer");

router.post(
  "/addtestimonial",
  authenticate,
  upload.single("image"),
  testimonialcontroller.addtestimonial
);
router.get("/testimonialview", authenticate, testimonialcontroller.viewtesti);
router.post(
  "/updatetestimonial/:id",
  authenticate,
  upload.single("image"),
  testimonialcontroller.updatetestimonial
);
router.get(
  "/deletetestimonial/:id",
  authenticate,
  testimonialcontroller.deletetestimonial
);
module.exports = router;
