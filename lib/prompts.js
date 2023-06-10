const { retrieveDepartments, retrieveRole, retrieveEmployee } = require('./fetchData')

// Inquirer prompts (run in 'selectTask')

const prompts = [
  // **********TASK**********
  {
    type: 'list',
    name: 'task',
    message: 'SELECT TASK:',
    choices: [
      "View All Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department", 
      "Add a Role",
      "Add an Employee",
      "Update an Employee's Role",
      "Update Employee Managers",
      "View Employees by Manager",
      "View Employees by Department",
      "Remove Department",
      "Remove Role",
      "Remove Employee",
      "View Department's Budget",
      "EXIT"
    ]
  },

  // **********Add a department**********
  {
    type: "input",
    name: "department",
    message: "ENTER NEW DEPARTMENT NAME:",
    when: (response) => {
      if (response.task === 'Add a department') {
        return true;
      }
      return false;
    },
    // Validate to ensure input is not blank
    validate: (response) => {
      if (response === "") {
        return console.log('\u001b[31m', '\n Try again');
      }
      return true;
    }
  },

  // **********Add a role**********
  {
    type: "input",
    name: "roleTitle",
    message: "ENTER NEW ROLE TITLE:",
    when: (response) => {
      if (response.task === 'Add a role') {
        return true;
      }
      return false;
    },
    // Validate to ensure input is not blank
    validate: (response) => {
      if (response === "") {
        return console.log('\u001b[31m', '\n Try again');
      }
      return true;
    }
  },
  {
    type: "input",
    name: "roleSalary",
    message: "ENTER ROLE SALARY:",
    when: (response) => {
      if (response.task === 'Add a role') {
        return true;
      }
      return false;
    },
    // Validate to ensure input is not blank
    validate: (response) => {
      if (response === "") {
        return console.log('\u001b[31m', '\n Try again');
      }
      return true;
    }
  },
  {
    type: "list",
    name: "roleDepartment",
    message: "SELECT ROLE DEPARTMENT:",
    // function located at retrieveDepartments.js to present current departments in connection
    choices: retrieveDepartments,
    when: (response) => {
      if (response.task === 'Add a role') {
        return true;
      }
      return false;
    }
  },

  // **********Add an employee**********
  {
    type: "input",
    name: "employeeFirstName",
    message: "ENTER FIRST NAME:",
    when: (response) => {
      if (response.task === 'Add an employee') {
        return true;
      }
      return false;
    },
    // Validate to ensure input is not blank
    validate: (response) => {
      if (response === "") {
        return console.log('\u001b[31m', '\n Try again');
      }
      return true;
    }
  },
  {
    type: "input",
    name: "employeeLastName",
    message: "ENTER LAST NAME:",
    when: (response) => {
      if (response.task === 'Add an employee') {
        return true;
      }
      return false;
    },
    // Validate to ensure input is not blank
    validate: (response) => {
      if (response === "") {
        return console.log('\u001b[31m', '\n Try again');
      }
      return true;
    }
  },
  {
    type: "list",
    name: "employeeRole",
    message: "SELECT EMPLOYEE ROLE:",
    // function located at retrieveRole.js to present current roles in connection
    choices: retrieveRole,
    when: (response) => {
      if (response.task === 'Add an employee') {
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "employeeManager",
    message: "SELECT EMPLOYEE MANAGER:",
    // function located at retrieveEmployee.js to present current employees in connection to select as manager
    choices: retrieveEmployee,
    when: (response) => {
      if (response.task === 'Add an employee') {
        return true;
      }
      return false;
    },
  },

  // **********Update an employee role**********
  {
    type: "list",
    name: "updateEmployee",
    message: "SELECT EMPLOYEE:",
    // reused function located at retrieveEmployee.js to present current employees in connection
    choices: retrieveEmployee,
    when: (response) => {
      if (response.task === 'Update an employee role') {
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "updateRole",
    message: "SELECT NEW ROLE:",
    // reused function located at retrieveRole.js to present current roles in connection to update
    choices: retrieveRole,
    when: (response) => {
      if (response.task === 'Update an employee role') {
        return true;
      }
      return false;
    },
  },
];

module.exports = prompts;