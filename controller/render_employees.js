const {   Pool } = require("pg");
const {render_properties} = require("../model/queries");
require("dotenv").config();
const connectionString = process.env.POSTGRES_URI;
//
function render_employees(req, res, filter, render_what) {
  //
  const { pagenumb } = req.query;
  let skip = 0;
  if (pagenumb) {
    skip = render_properties.limit * pagenumb - render_properties.limit;
  }
  const { name, email, role, designation } = req.user;

  let count = 0;
  console.log("count: " + count);
  let msg = count == 0 ? "No Data In System" : req.flash("msg");

  const pool = new Pool({
    connectionString,
  });
  let text =
    filter.added_by == undefined
      ? "SELECT * FROM users WHERE role=$1"
      : "SELECT * FROM users WHERE role=$1 AND added_by = $2";
  let values =
    filter.added_by == undefined
      ? [filter.role]
      : [filter.role, filter_added_by];
  pool.query(text, values, (err, result) => {
    if (err) {
      console.log("err-> rnder -> employees " + err.message);
    } else {
      let employees = result.rows;
      console.log("succ: -> rnder -> employees " + JSON.stringify(employees));

      res.render("page_employees", {
        auth_status: "logged-in",
        name,
        role,
        designation,
        email,
        data: employees,
        data_title: req.flash("data_title"),
        render_what,
        msg,
        count,
        skip,
        limit: render_properties.limit,
      });
    }
  });
}
module.exports = { render_employees };
