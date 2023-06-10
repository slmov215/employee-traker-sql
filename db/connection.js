// Import and require mysql2
const mysql = require('mysql2');
// const Connection = require('mysql2/typings/mysql/lib/Connection');

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'RootRoot',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
  );

  // Query database
// db.query('SELECT * FROM employees', function (err, results) {
//   console.log(results);
// });

module.exports = connection;