const connection = require('../db/connection');
const mainIndex = require('../db/index');


// response sent here from 'handleTask'
// functions for all ***UPDATE*** SQL queries

function updateEmployeeRole(response) {
  connection.query(`
  UPDATE employee SET role_id = ${response.updateRole} WHERE employee.id = ${response.updateEmployee}
  `, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Employee role updated!`);
    // const selectTask = require('./selectTask.js');
    mainIndex();
  });
};

module.exports = updateEmployeeRole;