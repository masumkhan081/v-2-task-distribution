const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const { Pool } = require("pg");
const queries = require("./---utils/---queries");
const routes = require("./---routes/---index");
const connectionString =
  "postgres://wkprqsej:PlfbPmIaj9K2ksQD5ynidFpmNWcoow_P@hansken.db.elephantsql.com/wkprqsej";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(ejsLayouts);
//
app.listen(3000, () => {
  console.log("run...ing");
});

app.use("", routes);
