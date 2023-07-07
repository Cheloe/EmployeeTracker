const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker_db database.`),
);

const chosenAction = {  
  viewAllDepartments: () => {
      //console.log('Viewing all departments');
      db.query('SELECT * FROM departments', function (err, results) {
          console.table(results);
          startInquirer();
      });
  },
  viewAllRoles: () => {
      db.query('SELECT * FROM roles', function (err, results) {
          console.table(results);
      });
  },
  viewAllEmployees: () => {
    const employeeQuery = `
SELECT
    e.employee_id AS id,
    e.employee_name AS name,
    r.role_name AS role,
    d.department_name AS department,
    m.employee_name AS manager
FROM
    employees e
JOIN
    roles r ON e.role_id = r.role_id
JOIN
    departments d ON e.department_id = d.department_id
LEFT JOIN
    employees m ON e.manager_id = m.employee_id
LEFT JOIN
    employees mm ON m.manager_id = mm.employee_id;
`;
      db.query(employeeQuery, function (err, results) {
        console.table(results);
      });
  },
  addDepartment: () => {
      db.query('INSERT INTO departments (name) VALUES (?)', response.newDepartmentName, function (err, results) {
          console.log(results);
      });
  },
  addRole: () => {
      db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [response.newRoleName, response.newRoleSalary, response.newRoleDepartment], function (err, results) {
          console.log(results);
      });
  },
  addEmployee: () => {
      db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [response.newEmployeeName, response.newEmployeeRole, response.newEmployeeSalary, response.newEmployeeManager], function (err, results) {
          console.log(results);
      });
  },
  updateEmployeeRole: () => {
      db.query('UPDATE employees SET role_id = ? WHERE id = ?', [response.newRole, response.employeeToUpdate], function (err, results) {
          console.log(results);
      });
  },
  deleteDepartment: () => {
    db.query('DELETE FROM departments WHERE id = ?', response.departmentToDelete, function (err, results) {
        console.log(results);
    });
  }
}

const appLogo = `
'   +-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+
'   |E|m|p|l|o|y|e|e| |T|r|a|c|k|e|r|
'   +-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+
`

function startInquirer() {
  // Display App Name
  console.log(appLogo);

  const questionOne = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    name: 'desiredAction'
  };

  inquirer
  .prompt(questionOne)
  .then((response) => {
      switch (response.desiredAction) {
          case 'View all departments':
              chosenAction.viewAllDepartments();
              break;
          case 'View all roles':
              chosenAction.viewAllRoles();
              break;
          case 'View all employees':
              chosenAction.viewAllEmployees();
              break;
          case 'Add a department':
              chosenAction.addDepartment();
              break;
          case 'Add a role':
              chosenAction.addRole();
              break;
          case 'Add an employee':
              chosenAction.addEmployee();
              break;
          case 'Update an employee role':
              chosenAction.updateEmployeeRole();
              break;
          default:
              console.log('Error');
      }
  });  
}

startInquirer();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// //TODO: define this and add it to all methods
// function startAgain() {
//   inquirer
//   .prompt ({
//     type: 'confirm',
//     message: 'Start Over?',
//     name: 'startAgain'
//     });
// };