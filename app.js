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

let newdate = new Date();
// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

// create db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE crud";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error", err);
    }
    console.log(result);
    res.send("Database Created...");
  });
});

//create post table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(30), description VARCHAR(100), postauthor VARCHAR(50), createddate date, updateddate date, PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

// Insert Post row data

app.get("/addpost1", (req, res) => {
  let post = {
    title: "post1",
    description: "post 1 description",
    postauthor: "XYZ author1",
    createddate: newdate,
    updateddate: newdate,
  };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 Added...");
  });
});

app.get("/addpost2", (req, res) => {
  let post = {
    title: "post2",
    description: "post 2 description",
    postauthor: "XYZ author222",
    createddate: newdate,
    updateddate: newdate,
  };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 2 Added...");
  });
});

app.get("/addpost3", (req, res) => {
  let post = {
    title: "post3",
    description: "post 3 description",
    postauthor: "XYZ author3",
    createddate: newdate,
    updateddate: newdate,
  };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 3 Added...");
  });
});

// Read Data
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Posts Data Fetched...");
    // res.status(200).json(result);
  });
});

// Select Single Post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Post Fetched...");
  });
});

//Delete Post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Post deleted...");
  });
});

//Update Post hardcoded
app.get("/update/:id", (req, res) => {
  let newTitle = "updated title";
  let newDesc = "updated DESC";
  let postauthor = "updated post author name";
  let newCreatedDate = newdate;
  let newUpdatedDate = newdate;

  let sql = `UPDATE posts SET title = '${newTitle}', description = '${newDesc}', postauthor = '${postauthor}', createddate='${newCreatedDate}',updateddate='${newUpdatedDate}' WHERE id=${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Post updated successfully...");
  });
});

//INSERT/POST
app.post("/insertposts", (req, res) => {
  let post = req.body;
  var sql =
    "SET @id = ?;SET @title = ?;SET @description = ?;SET @postauthor = ?;SET @createddate = ?;SET @updateddate = ?;\
     CALL postAddOrEdit(@id,@title,@description,@postauthor,@createddate,@updateddate);";
  db.query(
    sql,
    [
      post.id,
      post.title,
      post.description,
      post.postauthor,
      post.createddate,
      post.updateddate,
    ],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor == Array)
            res.send("New Post ID : " + element[0].id);
        });
      else console.log(err);
    }
  );
});

//update/POST
app.put("/updateposts", (req, res) => {
  let post = req.body;
  var sql =
    "SET @id = ?;SET @title = ?;SET @description = ?;SET @postauthor = ?;SET @createddate = ?;SET @updateddate = ?;\
     CALL postAddOrEdit(@id,@title,@description,@postauthor,@createddate,@updateddate);";
  db.query(
    sql,
    [
      post.id,
      post.title,
      post.description,
      post.postauthor,
      post.createddate,
      post.updateddate,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Post Updated");
      else console.log(err);
    }
  );
});

app.listen("3000", () => console.log("Server is running on port 3000"));
