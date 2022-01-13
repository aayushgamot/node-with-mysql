const express = require("express");
const router = express();
const portfoliocontroller = require("../controller/portfoliocontroller");
const { authenticate } = require("../conect/auth");
const { upload } = require("../conect/multer");

router.post(
  "/addPortfolio",
  authenticate,
  upload.array("image", 12),
  portfoliocontroller.addportfolio
);
router.get("/portfolio", authenticate, portfoliocontroller.portfolioview);
router.post(
  "/updatePortfolio/:id",
  upload.array("image", 12),
  authenticate,
  portfoliocontroller.updatePortfolio
);
router.get(
  "/deletePortfolio/:id",
  authenticate,
  portfoliocontroller.deletePortfolio
);
module.exports = router;
