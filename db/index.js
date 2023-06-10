const inquirer = require('inquirer');
const connection = require('./connection')
const prompts = require('../lib/prompts');
// const handleTask = require('../lib/handleTask');

const { viewDepartments, viewRoles, viewEmployees } = require('../lib/viewingQuery');
const { addDepartment, addRole, addEmployee } = require('../lib/addingQuery');
const updateEmployeeRole = require('../lib/updatingQuery')

function mainIndex() {
  inquirer
    .prompt(prompts)
    .then((response => {
      handleTask(response)
    }))
    .catch(err => {
      console.log(err)
    })
};

// reusable function (called after prompt in 'selectTask') to direct task choice to specific query function

function handleTask(response) {
  switch (response.task) {
    case "View all departments":
      viewDepartments();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "View all employees":
      viewEmployees();
      break;
    case "Add a department":
      addDepartment(response);
      break;
    case "Add a role":
      addRole(response);
      break;
    case "Add an employee":
      addEmployee(response);
      break;
    case "Update an employee role":
      updateEmployeeRole(response);
      break;
    case "EXIT":
      console.log("GOODBYE!");
      process.exit(0);
  }
};

// module.exports = handleTask;
module.exports = { mainIndex, handleTask };