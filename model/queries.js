const queries = {};
const render_properties = {
  limit: 5,
};
/*
drop table tasks; drop table groups
*/
queries.getTime = 'SELECT NOW() AS "theTime"';

queries.createTableTask = `CREATE TABLE IF NOT EXISTS Tasks (
       taskid SERIAL PRIMARY KEY,
       task_name VARCHAR(100) NOT NULL,
  by_id int NOT NULL,
  to_id int NOT NULL,
  to_name VARCHAR(50) NOT NULL,
  by_name VARCHAR(50) NOT NULL,
  assign_time VARCHAR(30) NOT NULL,
  due_time VARCHAR(30) NOT NULL,
  seen_time VARCHAR(30) NOT NULL,
  starting_time VARCHAR(30) NOT NULL,
  completion_time VARCHAR(30) NOT NULL,
  status VARCHAR(20) NOT NULL,
  detail VARCHAR(20) NOT NULL)`;

queries.createTableGroup = `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
         name VARCHAR(50) NOT NULL,
  email VARCHAR(30) NOT NULL,
  sec_email VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  designation VARCHAR(30) NOT NULL,
  added_by int NOT NULL,
  role VARCHAR(30) NOT NULL)`;

queries.insert_super_admin = {
  insertion_query:
    "INSERT INTO users(user_id,name,email,sec_email,password,designation,added_by,role) VALUES($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING RETURNING *;",
  insertion_values: [
    1,
    "masum khan",
    "masumkhan081@gmail.com",
    "",
    "passmeasadmin",
    "ceo",
    "0",
    "super-admin",
  ],
};

queries.login = (username, paswsword) => {
  return {
    insertion_query: "SELECT * FROM user WHERE email = $1 AND password = $2",
    insertion_values: [username, paswsword],
  };
};

queries.addTask = (name, groupid, status = false, priority, targetdate) => {};

queries.updateTask = (id, name, grpid, status, priority, target) => {};
queries.deleteTask = (id) => {};
queries.markTaskDone = (id) => {};

queries.addGroup = (groupname) => {};
queries.updateGroup = (groupid, groupname) => {};
queries.deleteGroup = (groupid) => {};



module.exports = {queries,render_properties };
