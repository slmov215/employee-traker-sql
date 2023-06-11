const { retrieveDepartments, retrieveRole, retrieveEmployee } = require('./fetchData')

// Inquirer prompts (run in 'selectTask')

const prompts = [
  // **********TASK**********
  {
    type: 'list',
    name: 'task',
    message: 'What would you like to do?',
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department", 
      "Add a Role",
      "Add an Employee",
      "Update an Employee's Role",
      "---BONUS---",
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
      if (response.task === 'Add a Department') {
        return true;
      }
      return false;
    },
  },

  // **********Add a role**********
  {
    type: "input",
    name: "roleTitle",
    message: "ENTER NEW ROLE TITLE:",
    when: (response) => {
      if (response.task === 'Add a Role') {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    name: "roleSalary",
    message: "ENTER ROLE SALARY:",
    when: (response) => {
      if (response.task === 'Add a Role') {
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "roleDepartment",
    message: "SELECT ROLE DEPARTMENT:",
    choices: retrieveDepartments,
    when: (response) => {
      if (response.task === 'Add a Role') {
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
      if (response.task === 'Add an Employee') {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    name: "employeeLastName",
    message: "ENTER LAST NAME:",
    when: (response) => {
      if (response.task === 'Add an Employee') {
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "employeeRole",
    message: "SELECT EMPLOYEE ROLE:",
    choices: retrieveRole,
    when: (response) => {
      if (response.task === 'Add an Employee') {
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "employeeManager",
    message: "SELECT EMPLOYEE MANAGER:",
    choices: retrieveEmployee,
    when: (response) => {
      if (response.task === 'Add an Employee') {
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
    choices: retrieveEmployee,
    when: (response) => {
      if (response.task === "Update an Employee's Role") {
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "updateRole",
    message: "SELECT NEW ROLE:",
    choices: retrieveRole,
    when: (response) => {
      if (response.task === "Update an Employee's Role") {
        return true;
      }
      return false;
    },
  },

  // **********Update an employee managers**********
  {
    type: "list",
    name: "updateEmployeeManager",
    message: "SELECT EMPLOYEE TO UPDATE:",
    choices: retrieveEmployee,
    when: (response) => {
      if (response.task === "Update Employee Managers") {
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "updateNewManager",
    message: "SELECT EMPLOYEE NEW MANAGER:",
    choices: retrieveEmployee,
    when: (response) => {
      if (response.task === "Update Employee Managers") {
        return true;
      }
      return false;
    },
  },

   // **********View employee by managers**********
  {
    type: "list",
    name: "employeeManager",
    message: "SELECT TO VIEW EMPLOYEES BY MANAGER:",
    choices: retrieveEmployee,
    when: (response) => {
      if (response.task === 'View Employees by Manager') {
        return true;
      }
      return false;
    },
  },

     // **********View employee by department**********
  {
    type: "list",
    name: "viewDepartment",
    message: "SELECT DEPARTMENT TO VIEW EMPLOYEE:",
    choices: retrieveDepartments,
    when: (response) => {
      if (response.task === 'View Employees by Department') {
        return true;
      }
      return false;
    },
  },

     // **********Delete a department**********
  {
    type: "list",
    name: "deleteDepartment",
    message: "SELECT DEPARTMENT TO REMOVE:",
    choices: retrieveDepartments,
    when: (response) => {
      if (response.task === 'Remove Department') {
        return true;
      }
      return false;
    }
  },

   // **********Delete a role**********
  {
    type: "list",
    name: "deleteRole",
    message: "SELECT ROLE TO REMOVE:",
    choices: retrieveRole,
    when: (response) => {
      if (response.task === 'Remove Role') {
        return true;
      }
      return false;
    }
  },
  
   // **********Delete an employee**********
  {
    type: "list",
    name: "deleteEmployee",
    message: "SELECT EMPLOYEE TO BE REMOVED:",
    choices: retrieveEmployee,
    when: (response) => {
      if (response.task === 'Remove Employee') {
        return true;
      }
      return false;
    }
  },
  // {
  //   type: "list",
  //   name: "departmentBudget",
  //   message: "SELECT DEPARTMENT TO VIEW BUDGET:",
  //   choices: retrieveDepartments,
  //   when: (response) => {
  //     if (response.task === "View Department's Budget") {
  //       return true;
  //     }
  //     return false;
  //   },
  // },
];


module.exports = prompts;