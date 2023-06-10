const connection = require('../db/connection');

// called in prompts.js to present user with current DEPARTMENT options

async function retrieveDepartments(response) {
  let departmentList;
  let returnedValue = await connection.promise().query(`
    SELECT * FROM department
    `).then((data) => {
    departmentList = data[0].map(data => {
      return {
        name: data.name,
        value: data.id
      }
    })
    return departmentList
  }).catch(err => {
    console.log(err);
  })
  return returnedValue
};

// called in prompts.js to present user with current ROLE options

async function retrieveRole(response) {
  let roleList;
  let returnedValue = await connection.promise().query(`
  SELECT * FROM role
  `).then((data) => {
    roleList = data[0].map(data => {
      return {
        name: data.title,
        value: data.id
      }
    })
    return roleList
  }).catch(err => {
    console.log(err);
  })
  return returnedValue
};

// called in prompts.js to present user with current EMPLOYEE options

async function retrieveEmployee(response) {
  let employeeList;
  let returnedValue = await connection.promise().query(`
  SELECT * FROM employee
  `).then((data) => {
    employeeList = data[0].map(data => {
      return {
        name: data.first_name + ` ` + data.last_name,
        value: data.id
      }
    })
    employeeList.push({ name: 'NONE', value: 0 });
    return employeeList
  }).catch(err => {
    console.log(err);
  })
  return returnedValue
};

module.exports = { retrieveDepartments, retrieveRole, retrieveEmployee };