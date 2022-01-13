const jwt = require("jsonwebtoken");

const generateToken = (req, res, next) => {
  console.log();
  let token = jwt.sign({ email: req.body.email }, process.env.PRIVATEKEY);
  res.cookie("jwt", token);
  console.log(token);
  next();
};
const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (token == undefined) {
      res.status(400).send("please Enter The Token");
    }
    const verifyUser = jwt.verify(token, process.env.PRIVATEKEY);
    req.user = verifyUser;
    next();
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  generateToken,
  authenticate,
};
