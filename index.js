// Required dependencies 
const connection = require('./db/connection');
const inquirer = require('inquirer');
const prompts = require('./lib/prompts');

// const handleTask = require('./lib/handleTask');
// const mainIndex = require('../db/index');
// const { addDepartment, addRole, addEmployee } = require('./lib/addingQuery');
const updateEmployeeRole = require('./lib/updatingQuery')

const { table } = require('table');
const config = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
};
// handle errors or start application
connection.connect(function (err) {
  if (err) throw err;
  init();
});

// start application, show title special-text and present task list prompt (using 'selectTask')
function init() {
  // displayTitleText();
  mainIndex();
};

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

const viewDepartments = () => {
  const sql = `SELECT * FROM department`;
  connection.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    showTable(rows);
    return mainIndex();
  });
};
const viewRoles = () => {
  const sql = `SELECT * FROM role`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    // console.table(res);
    showTable(res);
    // const selectTask = require('./selectTask.js');
    mainIndex();
  });
};
const viewEmployees = () => {
  const sql = `SELECT * FROM employee`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    // console.table(res);
    showTable(res);
    // const selectTask = require('./selectTask.js');
    mainIndex();
  });
};

function addDepartment(response) {
  connection.query(`
  INSERT INTO department (name)
  VALUES
  ('${response.department}');
  `, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `${response.department} department added!`);
    showTable(res);
    // const mainIndex = require('../index');
    mainIndex();
  });
};

function addRole(response) {
  connection.query(`
  INSERT INTO role (title, salary, department_id)
  VALUES
  ('${response.roleTitle}', '${response.roleSalary}', '${response.roleDepartment}')
  `, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `${response.roleTitle} role added!`);
    // const selectTask = require('./selectTask.js');
    mainIndex();
  });
};

function addEmployee(response) {
  connection.query(`
  INSERT INTO employee(first_name, last_name, role_id, manager_id)
  VALUES
  ('${response.employeeFirstName}', '${response.employeeLastName}', '${response.employeeRole}', '${response.employeeManager}' )
  `, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Employee ${response.employeeFirstName} ${response.employeeLastName} added!`);
    // const selectTask = require('./selectTask.js');
    mainIndex();
  });
};



async function showTable(rows) {
  // const { table } = require("table");
  let array = [];
  array = [Object.keys(rows[0]),
  ...rows.map(val => Object.values(val))];

  const answers = await inquirer.prompt([
    {
      message: "\n" + table(array, config),
      type: 'input',
      name: 'name'
    }
  ])
  // await showTable(array);
};
