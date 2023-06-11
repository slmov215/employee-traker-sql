// Required dependencies 
const connection = require('./db/connection');
const inquirer = require('inquirer');
const prompts = require('./lib/prompts');
const { table } = require('table');
const figlet = require("figlet");
const chalk = require("chalk");

// const { response } = require('express');
// table's border
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

const added = chalk.underline.green;
const removed = chalk.strikethrough.red;
const updated = chalk.hex('#FFA500'); // Orange color


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
    .then((res => {
      mainMenu(res)
    }))
    .catch(err => {
      console.log(err)
    })
};

function mainMenu(res) {
  switch (res.task) {
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
      addDepartment(res);
      break;
    case "Add a Role":
      addRole(res);
      break;
    case "Add an Employee":
      addEmployee(res);
      break;
    case "Update an Employee's Role":
      updateEmployeeRole(res);
      break;
    case "---BONUS---":
      bonus();
      break;
    case "Update Employee Managers":
      updateEmployeeManagers(res);
      break;
    case "View Employees by Manager":
      viewEmployeeByManager(res);
      break;
    case "View Employees by Department":
      viewEmployeesByDepartment(res);
      break;
    case "Remove Department":
      removeDepartment(res);
      break;
    case "Remove Role":
      removeRole(res);
      break;
    case "Remove Employee":
      removeEmployee(res);
      break;
    case "View Department's Budget":
      viewDepartmentsBudget(res);
      break;
    case "EXIT":
      console.log(figlet.textSync("Good\n    Bye", {
        font: "Standard",
        lineHeight: 5,
      }));
      process.exit(0);
  }
};
// functions for all SELECT SQL queries for viewing

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
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    showTable(rows);
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
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    showTable(rows);
    mainIndex();
  });
};

// functions for all INSERT SQL queries for adding

const addDepartment = (res) => {
  const sql = `INSERT INTO department (name)
                VALUES ('${res.department}')`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(added(`${res.department} department added!`));
    mainIndex();
  });
};
const addRole = (res) => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES 
                ('${res.roleTitle}', 
                '${res.roleSalary}', 
                '${res.roleDepartment}')`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `${res.roleTitle} 's role added!`);
    mainIndex();
  });
};
const addEmployee = (res) => {
  const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES ('${res.employeeFirstName}', 
                '${res.employeeLastName}', 
                '${res.employeeRole}', 
                '${res.employeeManager}')`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `${res.employeeFirstName} ${res.employeeLastName} has been added to the DataBase!`);
    mainIndex();
  });
};

// functions for all UPDATE SQL queries for updating

const updateEmployeeRole = (res) => {
  const sql = `UPDATE employee SET role_id = 
                ${res.updateRole} 
                WHERE employee.id = 
                ${res.updateEmployee}`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Employee role updated!`);
    mainIndex();
  });
};
const updateEmployeeManagers = (res) => {
  const sql = `UPDATE employee SET manager_id = 
                ${res.updateNewManager} 
                WHERE id = 
                ${res.updateEmployeeManager};`
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Employee's Manager updated!`);
    mainIndex();
  })
};

// functions for all SELECT SQL queries by sorting

const viewEmployeeByManager = (res) => {
  const sql = `SELECT id, 
                first_name, 
                last_name 
                FROM employee 
                WHERE manager_id = 
                ${res.employeeManager}`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    if (res.length === 0) {
      console.log('\u001b[36;1m', "This employee doesn't manage anyone");
      return mainIndex();
    }
    showTable(rows);
    mainIndex();
  });
}
const viewEmployeesByDepartment = (res) => {
  const sql = `SELECT * 
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                WHERE department.id = 
                ${res.viewDepartment}`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    showTable(rows);
    mainIndex();
  });
}

// functions for all DELETE SQL queries for removing

const removeDepartment = (res) => {
  const sql = `DELETE FROM department
                WHERE id = 
                ${res.deleteDepartment}`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(removed(`Department of ${res.deleteDepartment} TERMINATED!`));
    viewDepartments();
  });
}
const removeRole = (res) => {
  const sql = `DELETE FROM role
                WHERE id = 
                ${res.deleteRole}`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `The Role of ${res.deleteRole} has been TERMINATED!`);
    viewRoles();
  });
}
const removeEmployee = (res) => {
  const sql = `DELETE FROM employee
                WHERE id = 
                ${res.deleteEmployee}`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('\u001b[36;1m', `Employee has been terminated!`);
    viewEmployees();
  });
}
// function for SELECT SQL queries for viewing budget

const viewDepartmentsBudget = (res) => {
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

// function for creating table

function showTable(rows) {
  let array;
  array = [Object.keys(rows[0]),
  ...rows.map((val) => Object.values(val))];
  console.log(table(array));
  return table(array);
}
const bonus = () => {
  console.log('\u001b[36;1m', `Below are the bonus functionalities`);
  mainIndex();
};
// async function showTable(rows) {
//   // const { table } = require("table");
//   let array = [];
//   array = [Object.keys(rows[0]),
//   ...rows.map(val => Object.values(val))];

//   const answers = await inquirer.prompt([
//     {
//       message: "\n" + table(array, config),
//       type: 'input',
//       name: 'name'
//     }
//   ])
//   // await showTable(array);
// };