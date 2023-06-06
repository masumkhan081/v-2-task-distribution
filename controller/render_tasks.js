//
function render_tasks(req, res, filter, render_what) {
  const { pagenumb } = req.query;
  let skip = 0;
  if (pagenumb) {
    skip = render_properties.limit * pagenumb - render_properties.limit;
  }

  let count = 0;
  msg = count == 0 ? "No Data In System" : req.flash("msg");

  let text = "SELECT * FROM tasks WHERE by_id=$1";
  let values = [filter.by_id];

  pool.query(text, values, (err, result) => {
    if (err) {
      console.log("err-> rnder -> tasks " + err.message);
    } else {
      let employees = result.rows;
      console.log("succ: -> rnder -> tasks " + JSON.stringify(employees));

      res.render("page_allocated_tasks", {
        auth_status: "logged-in",
        name: req.user.name,
        role: req.user.role,
        designation: req.user.designation,
        role: req.user.role,
        tasks: tasks,
        render_what: "allocated-tasks",
        data_title: req.flash("data_title") + tasks[0].team_member_name,
        msg,
        count,
        skip,
        limit: render_properties.limit,
      });
    }
  });
}

function render_assigned_tasks(req, res, filter) {
  const { pagenumb } = req.query;
  let skip = 0;
  if (pagenumb) {
    skip = render_properties.limit * pagenumb - render_properties.limit;
  }
  let count = 0;
  //
  msg = count == 0 ? "No Data In System" : req.flash("msg");
  const pool = new Pool({
    connectionString,
  });
  let text =
    filter.added_by == undefined
      ? "SELECT * FROM tasks WHERE role=$1"
      : "SELECT * FROM users WHERE role=$1 AND added_by = $2";
  let values =
    filter.added_by == undefined
      ? [filter.role]
      : [filter.role, filter_added_by];
  pool.query(text, values, (err, result) => {
    if (err) {
      console.log("err-> rnder -> tasks " + err.message);
    } else {
      let employees = result.rows;
      console.log("succ: -> rnder -> tasks " + JSON.stringify(employees));

      res.render("page_allocated_tasks", {
        auth_status: "logged-in",
        name: req.user.name,
        role: req.user.role,
        designation: req.user.designation,
        role: req.user.role,
        tasks: tasks,
        render_what: "allocated-tasks",
        data_title: req.flash("data_title") + tasks[0].team_member_name,
        msg,
        count,
        skip,
        limit: render_properties.limit,
      });
    }
  });
}

module.exports = { render_tasks, render_assigned_tasks };
