// Required dependencies 
const connection = require('./db/connection');
const inquirer = require('inquirer');
const prompts = require('./lib/prompts');
const { table } = require('table');
const figlet = require("figlet");
const { response } = require('express');
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
  console.log(figlet.textSync("Employee\n     Tracker", {
    font: "Standard",
    lineHeight: 5,
  }))
  init();
});

// start application, show title special-text and present task list prompt (using 'selectTask')
function init() {
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
    case "View all Departments":
      viewDepartments();
      break;
    case "View all Roles":
      viewRoles();
      break;
    case "View all Employees":
      viewEmployees();
      break;
    case "Add a Department":
      addDepartment(response);
      break;
    case "Add a Role":
      addRole(response);
      break;
    case "Add an Employee":
      addEmployee(response);
      break;
    case "Update an Employee's Role":
      updateEmployeeRole(response);
      break;
    case "---BONUS---":
      bonus();
      break;
    case "Update Employee Managers":
      updateEmployeeManagers(response);
      break;
    case "View Employees by Manager":
      viewEmployeeByManager(response);
      break;
    case "View Employees by Department":
      viewEmployeesByDepartment(response);
      break;
    case "Remove Department":
      removeDepartment(response);
      break;
    case "Remove Role":
      removeRole(response);
      break;
    case "Remove Employee":
      removeEmployee(response);
      break;
    case "View Department's Budget":
      viewDepartmentsBudget(response);
      break;
    case "EXIT":
      console.log(figlet.textSync("Good\n    Bye", {
        font: "Standard",
        lineHeight: 5,
      }));
      process.exit(0);
  }
};
// functions for all ***Viewing*** SQL queries

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
  const sql = `SELECT role.id, 
                role.title, 
                role.salary, 
                department.name AS department
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    showTable(res);
    mainIndex();
  });
};
const viewEmployees = () => {
  const sql = `SELECT employee.id, 
                employee.first_name, 
                employee.last_name,
                role.title AS title,
                role.salary AS salary,
                department.name AS department,
                CONCAT (manager.first_name, " ", manager.last_name) AS manager 
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    showTable(res);
    mainIndex();
  });
};

const addDepartment = (response) => {
  const sql = `INSERT INTO department (name)
                VALUES ('${response.department}')`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `${response.department} department added!`);
    mainIndex();
  });
};
const addRole = (response) => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES 
                ('${response.roleTitle}', 
                '${response.roleSalary}', 
                '${response.roleDepartment}')`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `${response.roleTitle} 's role added!`);
    mainIndex();
  });
};
const addEmployee = (response) => {
  const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES ('${response.employeeFirstName}', 
                '${response.employeeLastName}', 
                '${response.employeeRole}', 
                '${response.employeeManager}')`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `${response.employeeFirstName} ${response.employeeLastName} has been added to the DataBase!`);
    mainIndex();
  });
};

// functions for all ***UPDATE*** SQL queries

const updateEmployeeRole = (response) => {
  const sql = `UPDATE employee SET role_id = 
                ${response.updateRole} 
                WHERE employee.id = 
                ${response.updateEmployee}`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Employee role updated!`);
    mainIndex();
  });
};

const updateEmployeeManagers = (response) => {
  const sql = `UPDATE employee SET manager_id = 
                ${response.updateNewManager} 
                WHERE id = 
                ${response.updateEmployeeManager};`
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Employee's Manager updated!`);
    mainIndex();
  })
};

// functions for all ***SORTED VIEWING*** SQL queries

const viewEmployeeByManager = (response) => {
  const sql = `SELECT id, 
                first_name, 
                last_name 
                FROM employee 
                WHERE manager_id = 
                ${response.employeeManager}`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    if (res.length === 0) {
      console.log('\u001b[36;1m', "This employee doesn't manage anyone");
      return mainIndex();
    }
    showTable(res);
    mainIndex();
  });
}
const viewEmployeesByDepartment = (response) => {
  const sql = `SELECT * 
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                WHERE department.id = 
                ${response.viewDepartment}`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    showTable(res);
    mainIndex();
  });
}
// functions for all ***REMOVAL*** SQL queries

const removeDepartment = (response) => {
  const sql = `DELETE FROM department
                WHERE id = 
                ${response.deleteDepartment}`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Department of ${response.deleteDepartment} TERMINATED!`);
    viewDepartments();
  });
}
const removeRole = (response) => {
  const sql = `DELETE FROM role
                WHERE id = 
                ${response.deleteRole}`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `The Role of ${response.deleteRole} has been TERMINATED!`);
    viewRoles();
  });
}
const removeEmployee = (response) => {
  const sql = `DELETE FROM employee
                WHERE id = 
                ${response.deleteEmployee}`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Employee has been terminated!`);
    viewEmployees();
  });
}

const viewDepartmentsBudget = (response) => {
  const sql = `SELECT department_id AS id,
                department.name AS department,
                SUM (salary) AS budget
                FROM role
                INNER JOIN department ON role.department_id = department.id
                GROUP BY role.department_id`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    showTable(rows);
    mainIndex();
  });
};
const bonus = () => {
  console.log('\u001b[36;1m', `Below are the bonus functionalities`);
  mainIndex();
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

