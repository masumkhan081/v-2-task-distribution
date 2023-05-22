const router = require("express").Router();
const { Pool } = require("pg");
const connectionString =
  "postgres://wkprqsej:PlfbPmIaj9K2ksQD5ynidFpmNWcoow_P@hansken.db.elephantsql.com/wkprqsej";
router.get("/", (req, res) => {
  const pool = new Pool({
    connectionString,
  });
  console.log("Successful connection to the database");
  const sql_create = `CREATE TABLE IF NOT EXISTS Books (
    Book_ID SERIAL PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Comments TEXT
  );`;

  pool.query(sql_create, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'Books' table");
  });

  console.log("Successful creation of the 'Books' table");
  // Database seeding
  const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
    (1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
    (2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
    (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne')
  ON CONFLICT DO NOTHING;`;
  pool.query(sql_insert, [], (err, result) => {
    if (err) {
      return console.error("::  error::  " + err.message);
    }
    const sql_sequence =
      "SELECT SETVAL('Books_Book_ID_Seq', MAX(Book_ID)) FROM Books;";
    pool.query(sql_sequence, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of 3 books");
    });
  });
});
router.get("/books", (req, res) => {
  const pool = new Pool({
    connectionString,
  });
  const sql = "SELECT * FROM Books ORDER BY Title";
  pool.query(sql, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(result);
    //res.render("books", { model: result.rows });
  });
});
router.get("/b", (req, res) => {});
router.get("/c", (req, res) => {});

module.exports = router;
