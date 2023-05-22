const express = require("express");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const ejslayout = require("express-ejs-layouts");
const { queries } = require("./model/queries");
// env vars
require("dotenv").config();
const port = process.env.PORT;
const connectionString = process.env.POSTGRES_URI;
//
const app = express();
app.set("view engine", "ejs");
app.use(ejslayout);
app.use(express.urlencoded({ extended: true }));
//
const { Client, Pool } = require("pg");
const client = new Client(connectionString);

client
  .connect()
  .then(() => {
    console.log("connected");
    //

    const pool = new Pool({
      connectionString,
    });
    pool.query(queries.createTableGroup, [], (err, result) => {
      if (err) {
        console.log("err-> users " + err.message);
      } else {
        console.log("tbl-> users");
      }
    });
    pool.query(queries.createTableTask, [], (err, result) => {
      if (err) {
        console.log("err-> Tasks " + err.message);
      } else {
        console.log("tbl-> Tasks");
      }
    });
    pool.query(
      queries.insert_super_admin.insertion_query,
      queries.insert_super_admin.insertion_values,
      (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log("Admin inserted");
        }
      }
    );
  })
  .catch((err) => console.error("connection error", err.stack));
//
app.listen(port, () => {
  console.log("server running ...");
});
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//
app.use("", require("./routes/auth"));
app.use("", require("./routes/user"));
app.use("", require("./routes/task"));
// npm start
