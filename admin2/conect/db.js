const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_sql",
});

db.connect(function (error) {
  if (error) throw error;
  console.log("Connected to mysql...");
});
module.exports = db;
