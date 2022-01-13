const express = require("express");
const router = express();
const contactuscontroller = require("../controller/contactuscontroller");
const { authenticate } = require("../conect/auth");

router.post("/addContact", authenticate, contactuscontroller.addContact);
router.get("/contactview", authenticate, contactuscontroller.contactusview);
router.post(
  "/updateContact/:id",
  authenticate,
  contactuscontroller.updateContact
);
router.get(
  "/deleteContact/:id",
  authenticate,
  contactuscontroller.deleteContact
);

module.exports = router;
