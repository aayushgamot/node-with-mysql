const { routes } = require("express");
const express = require("express");
const route = express();
const { upload } = require("../conect/multer");
const controller = require("../controller/controller");
const { authenticate, generateToken } = require("../conect/auth");
// const { upload } = require("../services/multer");

route.post("/login", generateToken, controller.login);

route.get("/register", controller.register);
route.post("/signup", upload.single("image"), controller.signup);

route.post("/forgetpass", controller.forgotpass);

route.post("/verifyOtp", controller.otp);

route.post("/resetpassword", controller.resetpassword);

route.post("/updatePassword", authenticate, controller.updatePassword);

route.get("/viewprofile", authenticate, controller.viewprofile);
route.post(
  "/updateprofile",
  authenticate,
  upload.single("image"),
  controller.updateprofile
);

// route.get("/viewprofile", auth, usercontrolar.viewprofile);

// route.get("/updateprofile", auth, usercontrolar.updateprofile);
// route.post(
//   "/updateviewprofile",
//   auth,
//   upload.single("image"),
//   usercontrolar.updateviewprofile
// );

// route.get("/resetPassword", auth, usercontrolar.resetPassword);
// route.post("/resetPass", auth, usercontrolar.resetPass);

// route.get("/logout", auth, usercontrolar.logout);

module.exports = route;
