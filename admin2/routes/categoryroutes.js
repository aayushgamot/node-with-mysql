const express = require("express");
const router = express();
const categorycontroller = require("../controller/categorycontroller");
const { authenticate } = require("../conect/auth");

router.post("/addCategory", authenticate, categorycontroller.addCategory);
router.get("/category", authenticate, categorycontroller.data);
router.post(
  "/updateCategory/:id",
  authenticate,
  categorycontroller.updateCategory
);
router.get(
  "/deleteCategory/:id",
  authenticate,
  categorycontroller.deleteCategory
);
module.exports = router;
