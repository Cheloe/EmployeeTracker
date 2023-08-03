const fs = require('fs');
const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');

//set connection to database
const db = mysql.createConnection({
    host: 'localhost',
    // MySQL Username
    user: 'root',
    password: '',
    database: 'employeeTracker_db'
},
    console.log(`Connected to the employeeTracker_db database.`)
);

//checking the established connection
db.connect(err => {
    if (err) throw err;
    console.log(`------------------------------------`);
    console.log(`          Employee Tracker          `);
    console.log(`------------------------------------`);
    inqPrompts();
});

//prompt questions
function inqPrompts() {
    inquirer.prompt([
        {
            type: 'list',
            name: `userChoice`,
            message: `what would you like to do?`,
            choices: [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Update Employee Manager",
                "View Employees By Manager",
                "View Employees by Department",
                "View total utilized budget of a Department",
                "Delete a Department",
                "Delete a Role",
                "Delete a Employee",
                "EXIT"
            ]
        }
    ])
        .then((res) => {
            console.log(res.userChoice);
            switch (res.userChoice) {
                case "View all Departments":
                    viewAllDepartments();
                    break;
                case "View all Roles":
                    viewAllRoles();
                    break;
                case "View all Employees":
                    viewAllEmployees();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "View Employees By Manager":
                    ViewEmployeesByManager();
                    break;
                case "View Employees by Department":
                    ViewEmployeesByDepartment();
                    break;
                case "View total utilized budget of a Department":
                    ViewBudgetByDepartment();
                    break;
                case "Delete a Department":
                    removeDepartment();
                    break;
                case "Delete a Role":
                    removeRole();
                    break;
                case "Delete a Employee":
                    removeEmployee();
                    break;
                case "EXIT":
                    db.end();
                    break;
                default:
                    console.log("Error has occured");
                    db.end();
                    break;
            }
        }).catch((err) => {
            if (err) throw err;
        });
};

//View Department
function viewAllDepartments() {
    //select from db
    db.query("select * from departments;", (err, res) => {
        if (err) throw err;
        console.table("All departments: ", res);
        inqPrompts();
    });
};

//View All Roles
function viewAllRoles() {
    //select from db
    db.query('SELECT * FROM roles',
        (err, res) => {
            if (err) throw err;
            console.table("All Roles: ", res);
            inqPrompts();
        });
};

//View All Employee
function viewAllEmployees() {
    //select from db
    const employeeQuery = `
SELECT e.id, e.employee_name, r.role_name, d.department_name, m.employee_name AS manager_name
FROM employees e
JOIN roles r ON e.role_id = r.id
JOIN departments d ON e.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id
LEFT JOIN employees mm ON m.manager_id = mm.id;
    
`;
    db.query(employeeQuery, (err, res) => {
        if (err) throw err;
        console.table("All Employees : ", res);
        inqPrompts();
    });
};

//Add a new department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "please enter department name: ",
            name: "department_name",
            validate: nameInput => {
              if (nameInput) {
                  return true;
              } else {
                  console.log('please enter department name!');
                  return false;
              }
            }
        },
    ]).then((res) => {
        console.log(res);
        db.query("INSERT INTO departments SET ?",
            {
                department_name: res.department_name,
            },
            (err) => {
                if (err) throw err;
            });
        console.log("Successfully Added New Department! = " + res.department_name);
        console.log("");
        viewAllDepartments();
    });
};

// Add New Role
function addRole() {
    db.query("SELECT * FROM departments;", (err, res) => {
        if (err) throw err;
        const pickDepartment = res.map((department) => {
            return {
                value: department.id,
                name: department.name,
            };
        });
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter a title for new role",
                name: "role_title",
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log('please enter role title!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                message: "Please enter a salary for role",
                name: "role_salary",
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log('please enter role salary!');
                        return false;
                    }
                }
            },
            {
                type: "list",
                message: "please select department for this role",
                name: "departmentId",
                choices: pickDepartment,
            },
        ])
            .then((res) => {
                db.query("INSERT INTO roles SET ?",
                    {
                        title: res.role_title,
                        salary: res.role_salary,
                        department_id: res.departmentId
                    },
                    (err) => {
                        if (err) throw err;
                    });
                console.log("Successfully Added New Role! = " + res.role_title);
                console.log("");
                viewAllRoles();
            });
    });
};

//Delete Department
function removeDepartment() {
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        const deleteDept = res.map((toDeleteDept) => {
            return {
                name: toDeleteDept.department_name,
                value: toDeleteDept.id
            }
        });
        console.log(deleteDept);
        inquirer.prompt([
            {
                type: "list",
                message: "Select a Department to Delete",
                name: "delDept",
                choices: deleteDept,
            }
        ])
        .then((res) => {
            const delDeptInfo = res.delDept;
            db.query("DELETE FROM departments WHERE id = ?",
                    delDeptInfo, (err) => {
                    if (err) throw err;
                    console.log("Successfully Deleted!");
                    console.log("Deleted Department: " + delDeptInfo);
                    console.log("");
                    viewAllDepartments();
                });
        });
    });
};