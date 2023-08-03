DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(50) NOT NULL,
    role_id INT ,
    manager_id INT ,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);
