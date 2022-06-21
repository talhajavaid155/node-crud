const express = require("express");
const mysql = require("mysql");

const app = express();

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0098bscs17",
  database: "crud",
  insecureAuth: true,
});

// create db
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE crud";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log("error", err);
//     }
//     console.log(result);
//     res.send("Database Created...");
//   });
// });

// connect
db.connect((err) => {
  if (err) {
    console.log("error");
  } else console.log("MySql Connected...");
});

app.listen("3000", () => {
  console.log("Port 3000 is running...");
});
