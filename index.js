const inquirer = require('inquirer');
const startInquirer = require('./startInquirer');
const db = require('mysql2');


// //TODO: group these and split them up.
inquirer
    .prompt([
        {
            type: 'input',
            message: 'New department name',
            name: 'newDepartmentName'
        },
        {
            type: 'input',
            message: 'What is the name of the new role?',
            name: 'newRoleName'
        },
        {
            type: 'input',
            message: 'What is the salary for the new role?',
            name: 'newRoleSalary'
        },
        {
            type: 'list',
            message: 'Which department does the new role belong to?',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
        },
        {
            type: 'input',
            message: 'Employee name (first, last)',
            name: 'newEmployeeName'
        },
        {
            type: 'list',
            message: 'Choose employee role:',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            name: 'newEmployeeRole'
        },
        {
            type: 'input',
            message: 'New employee salary:',
            name: 'newEmployeeSalary'
        },
        {
            type: 'input',
            message: 'New employee manager: (first, last)',
            name: 'newEmployeeManager'
        },
        {
            type: 'list',
            message: 'Choose an employee to update:',
            choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Malia Brown', 'Sarah Lourd', 'Tom Allen', 'Sammy Smith'],
            name: 'employeeToUpdate'
        },
        {
            type: 'list',
            message: 'Choose a new role for the employee:',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            name: 'newRole'
        }
    ])
    .then((response) => {
     console.log(response);
    })


const desiredAction = {  
    viewAllDepartments: function() {
        db.query('SELECT * FROM department', function (err, results) {
            console.log(results);
            startInquirer();
        });
    },
    viewAllRoles: function() {
        db.query('SELECT * FROM role', function (err, results) {
            console.log(results);
        });
    },
    viewAllEmployees: function() {
        db.query('SELECT * FROM employee', function (err, results) {
            console.log(results);
        });
    },
    addDepartment: function() {
        db.query('INSERT INTO department (name) VALUES (?)', response.newDepartmentName, function (err, results) {
            console.log(results);
        });
    },
    addRole: function() {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.newRoleName, response.newRoleSalary, response.newRoleDepartment], function (err, results) {
            console.log(results);
        });
    },
    addEmployee: function() {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [response.newEmployeeName, response.newEmployeeRole, response.newEmployeeSalary, response.newEmployeeManager], function (err, results) {
            console.log(results);
        });
    },
    updateEmployeeRole: function() {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.newRole, response.employeeToUpdate], function (err, results) {
            console.log(results);
        });
    }
}



// // here's what I need to do to make this work on the js side:
// // 1. Display the view all employees table in the console. This table will show the employee's id, first name, last name, title, department, salary, and manager
// // 2. create a switch statement that will run the appropriate function based on the user's first inquirer response
//         //a. if for instance the user chooses to view all departments, the switch statement will run the view all departments function
//         //b. the view all departments function will query the database, return all departments, and display them in the console as a table, then return to the main menu
//         // b. create a function view all departments that will query the database and return all departments
//         // c. create a function view all roles that will query the database and return all roles
//         // d. create a function view all employees that will query the database and return all employees
// // 3. create a function add a department that will query the database and add a department, then verify that the department was added, display the departments table and return to the main menu
// // 4. create a function add a role that will query the database and add a role, then verify that the role was added, display the roles table and return to the main menu
// //5. create a function add an employee that will query the database and add an employee, then verify that the employee was added, display the employees table and return to the main menu
// // 6. create a function update an employee role that will query the database, provide a list of employees to choose from in Inquirer, then update the employee's role, verify that the role was updated, display the employees table and return to the main menu


// // here's what I need to do to make this work on the sql side:
// // 1. create a database called employee_tracker_db
// // 2. create a table called departments with the following columns: id, name
// // 3. create a table called roles with the following columns: id, title, salary, department_id
// // 4. create a table called employees with the following columns: id, first_name, last_name, role_id, manager_id
// // 5. create a table called managers with the following columns: id, first_name, last_name, department_id
// // 6. create a seed.sql file that will seed the database with the following data:
//     // a. departments: Sales, Engineering, Finance, Legal
//     // b. roles: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer
//     // c. employees: John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Malia Brown, Sarah Lourd, Tom Allen, Sammy Smith
//     // d. managers: Jillian Smith, Doug Fir, Steve Brown, Olivia Wilson, Phil Collins, Tony Danza, Uma Thurman, Quincy Jones
// // 7. create a schema.sql file that will create the database and tables
// // 8. join the tables so that the employee's role, department, manager, and salary are displayed in the employee table
// // 9. join the tables so that the role's department is displayed in the role table
// // 10. join the tables so that the manager's department is displayed in the manager table