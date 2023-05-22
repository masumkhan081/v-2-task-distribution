const queries = {};
/*
drop table tasks; drop table groups
*/
queries.getTime = 'SELECT NOW() AS "theTime"';

queries.createTableTask = `CREATE TABLE IF NOT EXISTS Tasks (
    taskid SERIAL PRIMARY KEY,
    groupid int,
    taskname VARCHAR(100) NOT NULL,
    status boolean NOT NULL,
    priority VARCHAR(100) NOT NULL,
    targetdate VARCHAR(20),
    CONSTRAINT fk_Groups
      FOREIGN KEY(groupid ) 
	  REFERENCES Groups(groupid )
      ON DELETE SET NULL)`;

queries.createTableGroup = `CREATE TABLE IF NOT EXISTS Groups (
        groupid SERIAL PRIMARY KEY,
        groupname VARCHAR(50) NOT NULL)`;

queries.addTask = (name, groupid, status = false, priority, targetdate) => {};

queries.updateTask = (id, name, grpid, status, priority, target) => {};
queries.deleteTask = (id) => {};
queries.markTaskDone = (id) => {};

queries.addGroup = (groupname) => {};
queries.updateGroup = (groupid, groupname) => {};
queries.deleteGroup = (groupid) => {};

module.exports = queries;
