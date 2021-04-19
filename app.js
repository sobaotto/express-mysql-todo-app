const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todos",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("接続成功");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM todos", (error, results) => {
    res.render("index.ejs", { todos: results });
  });
});

app.get("/detail/:id", (req, res) => {
  connection.query(
    `SELECT * FROM todos WHERE id=${req.params.id}`,
    (error, result) => {
      res.render("detail.ejs", { todo: result });
    }
  );
});

app.post("/update/:id", (req, res) => {
  connection.query(
    `SELECT * FROM todos WHERE id=${req.params.id}`,
    (error, result) => {
      res.render("detail.ejs", { todo: result });
    }
  );
});

app.post("/delete/:id", (req, res) => {
  connection.query(
    `DELETE FROM todos WHERE id=${req.params.id}`,
    res.redirect("/")
  );
});

app.post("/create", (req, res) => {
  connection.query(
    `INSERT INTO todos (title, isDone) VALUES ('${req.body.title}', FALSE);`,
    res.redirect("/")
  );
});

app.listen(3000);
