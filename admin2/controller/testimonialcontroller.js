const db = require("../conect/db");
const {
  validateAddtestimonial,
} = require("../validation/testimonialvalidation");

exports.addtestimonial = async (req, res) => {
  try {
    const { error } = validateAddtestimonial(req.body);

    if (error) {
      if (error.details[0].context.key == "name") {
        var err1 = error.details[0].message;
        return res.status(400).send(err1);
      }
      if (error.details[0].context.key == "address") {
        var err2 = error.details[0].message;
        return res.status(400).send(err2);
      }
      if (error.details[0].context.key == "email") {
        var err3 = error.details[0].message;
        return res.status(400).send(err3);
      }
    }
    const { name, address, email } = req.body;
    const image = req.file.filename;
    db.query(
      "INSERT INTO testimonial SET ?",
      {
        name: name,
        address: address,
        email: email,
        image: image,
      },
      (err, addResult) => {
        if (addResult) {
          res.send("Testimonial Will Be Add");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
exports.viewtesti = async (req, res) => {
  db.query("SELECT * FROM testimonial ", async (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(400).send("data not found");
    }
  });
};
exports.updatetestimonial = async (req, res) => {
  try {
    let id = req.params.id;
    const { name, address, email } = req.body;
    const image = req.file.filename;
    db.query(
      `UPDATE testimonial SET name='${name}',address='${address}', email='${email}',image='${image}' WHERE id=?`,
      [id],
      async (err, result) => {
        if (result) {
          res.send("Testimonial Will Be Update");
        } else {
          res.status(400).send("data not found");
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
exports.deletetestimonial = async (req, res) => {
  try {
    let id = req.params.id;
    db.query(
      "DELETE FROM testimonial WHERE id=?",
      [id],
      async (err, result) => {
        if (result) {
          res.send("Testimonial Delete Successfuly");
        } else {
          res.status(400).send("data not found");
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
