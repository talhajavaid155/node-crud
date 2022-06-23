const express = require("express");
const mysql = require("mysql");
// connection configurations
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "crud",
  insecureAuth: true,
  multipleStatements: true,
});

const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.listen("3000", () => console.log("Server is running on port 3000"));
// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected");
});

//Create DB

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE crud";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

// Create Table
app.get("/createuserstable", (req, res) => {
  let sql =
    "CREATE TABLE users(id INT AUTO_INCREMENT,first_name VARCHAR(100),last_name VARCHAR(100),email VARCHAR(50),password VARCHAR(20),date_of_birth VARCHAR(100),created_date DATETIME,updated_date DATETIME,PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("User Table Created created...");
  });
});
var currentDate = new Date();
// Insert User 1
app.get("/adduser1", (req, res) => {
  let user = {
    first_name: "Saad",
    last_name: "Ali",
    email: "test1@gmail.com",
    password: "12345",
    date_of_birth: "1-04-1999",
    created_date: currentDate,
    updated_date: currentDate,
  };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, user, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("User Added");
  });
});

// Insert User 2
app.get("/adduser2", (req, res) => {
  let user = {
    first_name: "John",
    last_name: "Doe",
    email: "test2@gmail.com",
    password: "1234",
    date_of_birth: "15-05-1997",
    created_date: currentDate,
    updated_date: currentDate,
  };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, user, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("User Added");
  });
});

// Get Users
app.get("/users", (req, res) => {
  let sql = "SELECT * FROM users";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

// Get Single User
app.get("/getuser/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM users WHERE id=${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Searched User Fetched...");
  });
});

// Update Single User
app.get("/updateuser/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM users WHERE id=${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Searched User Fetched...");
  });
});

// ADD USER
app.post("/users", (req, res) => {
  let user = req.body;
  let sql =
    "SET @id = ?;SET @first_name = ?;SET @last_name = ?;SET @email = ?; SET @password = ?; SET @date_of_birth = ?; SET @created_date = ?;  SET @updated_date = ?;\
  CALL UserAddOrEdit(@id,@first_name,@last_name,@email,@password,@date_of_birth,@created_date,@updated_date);";

  db.query(
    sql,
    [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.date_of_birth,
      user.created_date,
      user.updated_date,
    ],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor == Array)
            res.send("New User ID : " + element[0].id);
        });
      else console.log(err);
      // console.log(result);
      // // rows.forEach(element => {
      // //     if(element.constructor == Array)
      // //     res.send('New Learner ID : '+ element[0].learner_id);
      // //     });
      // res.send(rows);
    }
  );
});

// UPDATE USER
app.put("/users", (req, res) => {
  let user = req.body;

  let sql =
    "SET @id = ?; SET @first_name = ?;SET @last_name = ?;SET @email = ?; SET @password = ?; SET @date_of_birth = ?; SET @created_date = ?;  SET @updated_date = ?;\
  CALL UserAddOrEdit(@id,@first_name,@last_name,@email,@password,@date_of_birth,@created_date,@updated_date);";

  db.query(
    sql,
    [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.date_of_birth,
      user.created_date,
      user.updated_date,
    ],
    (err, rows, fields) => {
      if (!err) res.send("User details updated successfully");
      else console.log(err);
    }
  );
});

// Delete user
app.delete("/deleteuser/:id", (req, res) => {
  let id = req.params.id;
  let sql = `DELETE  FROM users WHERE id=${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`User with id:${id} has been deleted`);
  });
});
