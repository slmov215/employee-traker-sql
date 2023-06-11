const { fetchDepartments, fetchRole, fetchEmployee } = require('./fetchData')

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
    message: "PLEASE ENTER THE NEW DEPARTMENT NAME:",
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
    message: "PLEASE ENTER THE NEW ROLE'S TITLE:",
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
    message: "PLEASE ENTER THE ROLE'S SALARY:",
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
    message: "SELECT THE ROLE'S DEPARTMENT:",
    choices: fetchDepartments,
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
    message: "ENTER THE EMPLOYEE'S FIRST NAME:",
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
    message: "ENTER THE EMPLOYEE'S LAST NAME:",
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
    message: "SELECT THE EMPLOYEE'S ROLE:",
    choices: fetchRole,
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
    message: "SELECT THE EMPLOYEE'S MANAGER:",
    choices: fetchEmployee,
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
    message: "SELECT AN EMPLOYEE:",
    choices: fetchEmployee,
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
    message: "SELECT THE EMPLOYEE'S NEW ROLE:",
    choices: fetchRole,
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
    message: "SELECT AN EMPLOYEE TO UPDATE:",
    choices: fetchEmployee,
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
    message: "SELECT THE EMPLOYEE'S NEW MANAGER:",
    choices: fetchEmployee,
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
    choices: fetchEmployee,
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
    message: "SELECT A DEPARTMENT TO VIEW EMPLOYEE:",
    choices: fetchDepartments,
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
    message: "SELECT A DEPARTMENT TO BE REMOVE:",
    choices: fetchDepartments,
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
    message: "SELECT A ROLE TO BE REMOVE:",
    choices: fetchRole,
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
    message: "SELECT AN EMPLOYEE TO BE REMOVED:",
    choices: fetchEmployee,
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
  //   choices: fetchDepartments,
  //   when: (response) => {
  //     if (response.task === "View Department's Budget") {
  //       return true;
  //     }
  //     return false;
  //   },
  // },
];


module.exports = prompts;