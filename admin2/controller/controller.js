const db = require("../conect/db");
const bcrypt = require("bcrypt");
const {
  validateUser,
  validateloging,
  validateResetPassword,
  validateupdatePassword,
  validateprofile,
} = require("../validation/validation");
const { OTPsend } = require("../conect/mail");
const saltRound = 10;
// const Salt = require("salt");
// const bcrypt = require("bcrypt");
// const salt = 10;
// const logger = require("../loggar/logger");
// const { OTPsend } = require("../services/mail");

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

exports.register = (req, res) => {
  res.send("User register Page is open");
};

exports.signup = async (req, res) => {
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) {
    if (error.details[0].context.key == "surname") {
      var err1 = error.details[0].message;
      return res.status(400).send(err1);
    }

    if (error.details[0].context.key == "name") {
      var err2 = error.details[0].message;
      return res.status(400).send(err2);
    }
    if (error.details[0].context.key == "email") {
      var err3 = error.details[0].message;
      return res.status(400).send(err3);
    }
    if (error.details[0].context.key == "phone") {
      var err4 = error.details[0].message;
      return res.status(400).send(err4);
    }
    if (error.details[0].context.key == "password") {
      var err5 = error.details[0].message;
      return res.status(400).send(err5);
    }
    if (error.details[0].context.key == "conformPassword") {
      var err6 = error.details[0].message;
      return res.status(400).send(err6);
    }
    if (error.details[0].context.key == "gender") {
      var err7 = error.details[0].message;
      return res.status(400).send(err7);
    }
    if (error.details[0].context.key == "country") {
      var err8 = error.details[0].message;
      return res.status(400).send(err8);
    }
    if (error.details[0].context.key == "hobbies") {
      var err9 = error.details[0].message;
      return res.status(400).send(err9);
    }
  }
  const { surname, name, email, phone, password, gender, country, hobbies } =
    req.body;
  const image = req.file.filename;
  db.query("INSERT email FROM users WHERE email=?", [email], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      return res.status(400).send("Email is already register ");
    }
  });
  const hashPassword = await bcrypt.hash(password, saltRound);

  db.query(
    "INSERT INTO register SET ?",
    {
      surname: surname,
      name: name,
      email: email,
      phone: phone,
      password: hashPassword,
      image: image,
      gender: gender,
      country: country,
      hobbies: hobbies,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.status(200).send("User Registered");
};

exports.login = async (req, res) => {
  console.log("1234");
  const { error } = validateloging(req.body);
  if (error) {
    if (error.details[0].context.key == "email") {
      var err3 = error.details[0].message;
      return res.status(400).send(err3);
    }
    if (error.details[0].context.key == "password") {
      var err5 = error.details[0].message;
      return res.status(400).send(err5);
    }
  }
  const { email, password } = req.body;
  console.log(req.body.email);
  db.query(
    "SELECT * FROM register WHERE email=?",
    [email],
    async (err, result) => {
      if (result.length > 0) {
        const validPassword = await bcrypt.compare(
          password,
          result[0].password
        );
        if (validPassword) {
          res.send("login Successful");
        } else {
          res.status(400).send("Username or Password was incorrect");
        }
      } else {
        res.status(400).send("User not found");
      }
    }
  );
};

exports.forgotpass = async (req, res) => {
  const { error } = validateloging(req.body);
  if (error) {
    if (error.details[0].context.key == "email") {
      var err3 = error.details[0].message;
      return res.status(400).send(err3);
    }
  }
  const { email } = req.body;
  db.query(
    "SELECT * FROM register WHERE email=?",
    [email],
    async (err, result) => {
      if (result.length > 0) {
        OTPsend(email, otp);
        res.send("Otp send successfuly");
      } else {
        res.status(400).send("User not found");
      }
    }
  );
};

exports.otp = async (req, res) => {
  console.log(req.body);
  const { userotp } = req.body;
  if (otp == userotp) {
    res.send("otp matched");
  } else {
    res.status(400).send("Enter the incorrect otp ");
  }
};

exports.resetpassword = async (req, res) => {
  const { error } = validateResetPassword(req.body);
  if (error) {
    if (error.details[0].context.key == "email") {
      var err1 = error.details[0].message;
      return res.status(400).send(err1);
    }
    if (error.details[0].context.key == "password") {
      var err5 = error.details[0].message;
      return res.status(400).send(err5);
    }
    if (error.details[0].context.key == "repassword") {
      var err6 = error.details[0].message;
      return res.status(400).send(err6);
    }
  }
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM register WHERE email=?",
    [email],
    async (err, result) => {
      if (result.length > 0) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        db.query(
          `UPDATE register SET password='${hashPassword}' WHERE email=?`,
          [email],
          async (err, updateResult) => {
            if (updateResult) {
              res.send("Password Will Be Update");
            } else {
              res.status(400).send("Something Was Wrong");
            }
          }
        );
      } else {
        res.status(400).send("User not found");
      }
    }
  );
};

exports.updatePassword = async (req, res) => {
  console.log(req.body);
  const { error } = validateupdatePassword(req.body);
  if (error) {
    if (error.details[0].context.key == "oldPassword") {
      var err1 = error.details[0].message;
      return res.status(400).send(err1);
    }
    if (error.details[0].context.key == "newPassword") {
      var err5 = error.details[0].message;
      return res.status(400).send(err5);
    }
    if (error.details[0].context.key == "resetpassword") {
      var err6 = error.details[0].message;
      return res.status(400).send(err6);
    }
  }
  const email = req.user.email;
  const { newPassword } = req.body;
  db.query(
    "SELECT * FROM register WHERE email=?",
    [email],
    async (err, result) => {
      if (result) {
        console.log(result);
        const comparision = await bcrypt.compare(
          req.body.oldPassword,
          result[0].password
        );
        if (comparision) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(newPassword, salt);
          db.query(
            `UPDATE register SET password='${hashPassword}' WHERE email=?`,
            [email],
            async (err, updateResult) => {
              if (updateResult) {
                res.send("Password Will Be Update");
              } else {
                res.status(400).send("Something Was Wrong");
              }
            }
          );
        } else {
          res.status(400).send("Current Password is incorrect");
        }
      }
    }
  );
};

exports.viewprofile = async (req, res) => {
  const email = req.user.email;

  db.query(
    "SELECT * FROM register WHERE email=?",
    [email],
    async (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(400).send("data not found");
      }
    }
  );
};
exports.updateprofile = async (req, res) => {
  try {
    const { error } = validateprofile(req.body);
    console.log(req.body);

    if (error) {
      if (error.details[0].context.key == "surname") {
        var err1 = error.details[0].message;
        return res.status(400).send(err1);
      }

      if (error.details[0].context.key == "name") {
        var err2 = error.details[0].message;
        return res.status(400).send(err2);
      }
      if (error.details[0].context.key == "email") {
        var err3 = error.details[0].message;
        return res.status(400).send(err3);
      }
      if (error.details[0].context.key == "phone") {
        var err4 = error.details[0].message;
        return res.status(400).send(err4);
      }
      if (error.details[0].context.key == "gender") {
        var err7 = error.details[0].message;
        return res.status(400).send(err7);
      }
      if (error.details[0].context.key == "country") {
        var err8 = error.details[0].message;
        return res.status(400).send(err8);
      }
      if (error.details[0].context.key == "hobbies") {
        var err9 = error.details[0].message;
        return res.status(400).send(err9);
      }
    }
    const { surname, name, email, phone, gender, country, hobbies } = req.body;
    const image = req.file.filename;
    const userEmail = req.user.email;
    db.query(
      "SELECT * FROM register WHERE email=?",
      [userEmail],
      async (err, result) => {
        if (result) {
          db.query(
            `UPDATE register SET surname='${surname}',name='${name}',email='${email}',phone='${phone}',image='${image}',gender='${gender}',country='${country}',hobbies='${hobbies}' WHERE email=?`,
            [email],
            async (err, updateResult) => {
              if (updateResult) {
                res.send("Profile Will Be Update");
              } else {
                res.status(400).send("Something Was Wrong");
              }
            }
          );
        } else {
          res.status(400).send("data not found");
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
