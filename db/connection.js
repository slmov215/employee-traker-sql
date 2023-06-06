// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootroot',
    database: 'classlist_db'
  },
  console.log(`Connected to the employees_db database.`)
  );

  // Query database
db.query('SELECT * FROM employees', function (err, results) {
  console.log(results);
});

module.exports = db;