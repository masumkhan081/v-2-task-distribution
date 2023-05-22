const express = require("express");
const router = require("express").Router();
//
const pg = require("pg");
const { Pool } = require("pg");
const connectionString =
  "postgres://wkprqsej:PlfbPmIaj9K2ksQD5ynidFpmNWcoow_P@hansken.db.elephantsql.com/wkprqsej";
const queries = require("../---utils/---queries");

// -----------------------------------------------CONNECTION
var client = new pg.Client(connectionString);
const pool = new Pool({
  connectionString,
});
client.connect(function (err) {
  if (err) {
    s;
    console.log(err);
  }
  pool.query(queries.createTableGroup, [], (err, result) => {
    if (err) {
      console.log("err-> Groups " + err.message);
    } else {
      console.log("tbl-> Groups");
    }
  });
  pool.query(queries.createTableTask, [], (err, result) => {
    if (err) {
      console.log("err-> Tasks " + err.message);
    } else {
      console.log("tbl-> Tasks");
    }
  });
});

router.get("/", (req, res) => {
  res.render("landing");
});
router.get("/addtask", (req, res) => {
  res.render("taskform");
});

module.exports = router;
