const db = require("../conect/db");
const { portfoliovalidation } = require("../validation/portfoliovalidation");

exports.addportfolio = async (req, res) => {
  try {
    const { error } = portfoliovalidation(req.body);
    console.log(error);
    if (error) {
      if (error.details[0].context.key == "porjectname") {
        var err2 = error.details[0].message;
        return res.status(400).send(err2);
      }
      if (error.details[0].context.key == "porjecttitle") {
        var err4 = error.details[0].message;
        return res.status(400).send(err4);
      }
      if (error.details[0].context.key == "porjectdate") {
        var err5 = error.details[0].message;
        return res.status(400).send(err5);
      }
      if (error.details[0].context.key == "message") {
        var err6 = error.details[0].message;
        return res.status(400).send(err6);
      }
    }

    const category = req.body.projectcategory;
    const resu = db.query(
      `SELECT * FROM category WHERE name = ?`,
      [category],
      (err, result) => {
        console.log(result);
        if (result) {
          const multipleimg = req.files.map(
            (multipleimg) => multipleimg.filename
          );
          const projectcategory = result[0].id;
          const { porjectname, porjecttitle, porjectdate, message } = req.body;
          const image = multipleimg;
          db.query(
            "INSERT INTO portfolio SET ?",
            {
              projectcategory: projectcategory,
              porjectname: porjectname,
              porjecttitle: porjecttitle,
              porjectdate: porjectdate,
              message: message,
              image: image,
            },
            (err, addResult) => {
              if (addResult) {
                res.send("Portfolio Will Be Add");
              }
            }
          );
        } else {
          res.status(400).send("Category Not Found");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
exports.portfolioview = async (req, res) => {
  db.query(
    "SELECT portfolio.id,category.name,porjectname,porjecttitle,porjectdate,message,image FROM portfolio INNER JOIN category ON category.id = portfolio.projectcategory",
    async (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(400).send("data not found");
      }
    }
  );
};
exports.updatePortfolio = async (req, res) => {
  try {
    console.log(req.body);
    let id = req.params.id;
    const category = req.body.projectcategory;
    db.query(
      `SELECT * FROM category WHERE name = ?`,
      [category],
      (err, result) => {
        if (result) {
          const multipleimg = req.files.map(
            (multipleimg) => multipleimg.filename
          );
          const projectcategory = result[0].id;
          const { porjectname, porjecttitle, porjectdate, message } = req.body;
          const image = multipleimg;
          db.query(
            "UPDATE portfolio SET ?",
            {
              projectcategory: projectcategory,
              porjectname: porjectname,
              porjecttitle: porjecttitle,
              porjectdate: porjectdate,
              message: message,
              image: image,
            },
            (err, addResult) => {
              if (addResult) {
                res.send("Portfolio Will Be update");
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
exports.deletePortfolio = async (req, res) => {
  try {
    let id = req.params.id;
    db.query("DELETE FROM portfolio WHERE id=?", [id], async (err, result) => {
      if (result) {
        res.send("Portfolio Delete Successfuly");
      } else {
        res.status(400).send("data not found");
      }
    });
  } catch (error) {
    console.error(error);
  }
};
