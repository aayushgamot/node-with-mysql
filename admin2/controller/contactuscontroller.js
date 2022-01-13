const db = require("../conect/db");
const { contactusvalidation } = require("../validation/contactusvalidation");
exports.addContact = async (req, res) => {
  try {
    console.log(req.body);
    const { error } = contactusvalidation(req.body);
    if (error) {
      if (error.details[0].context.key == "name") {
        var err1 = error.details[0].message;
        return res.status(400).send(err1);
      }
      if (error.details[0].context.key == "email") {
        var err2 = error.details[0].message;
        return res.status(400).send(err2);
      }
      if (error.details[0].context.key == "phone") {
        var err3 = error.details[0].message;
        return res.status(400).send(err3);
      }
      if (error.details[0].context.key == "message") {
        var err4 = error.details[0].message;
        return res.status(400).send(err4);
      }
      if (error.details[0].context.key == "date") {
        var err5 = error.details[0].message;
        return res.status(400).send(err5);
      }
    }
    const { name, email, phone, message, date } = req.body;
    db.query(
      "SELECT * FROM contactus WHERE email=?",
      [email],
      (err, result) => {
        if (result.length > 0) {
          return res.status(400).send("Contact Email already add");
        } else {
          db.query(
            "INSERT INTO contactus SET ?",
            {
              name: name,
              email: email,
              phone: phone,
              message: message,
              date: date,
            },
            (err, addResult) => {
              if (addResult) {
                res.send("Contact Will Be Add");
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
exports.contactusview = async (req, res) => {
  db.query("SELECT * FROM contactus ", async (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(400).send("data not found");
    }
  });
};
exports.updateContact = async (req, res) => {
  try {
    let id = req.params.id;
    const { name, email, phone, message, date } = req.body;
    db.query(
      `UPDATE contactus SET name='${name}', email='${email}', phone='${phone}', message='${message}', date='${date}' WHERE id=?`,
      [id],
      async (err, result) => {
        if (result) {
          res.send("Contact Will Be Update");
        } else {
          res.status(400).send("data not found");
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
exports.deleteContact = async (req, res) => {
  try {
    let id = req.params.id;
    db.query("DELETE FROM contactus WHERE id=?", [id], async (err, result) => {
      if (result) {
        res.send("Contact Delete Successfuly");
      } else {
        res.status(400).send("data not found");
      }
    });
  } catch (error) {
    console.error(error);
  }
};
