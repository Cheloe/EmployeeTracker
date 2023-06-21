DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE roles (
  role_id INT PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL
);

CREATE TABLE departments (
  department_id INT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
);


CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  employee_name VARCHAR(50) NOT NULL,
  role_id INT,
  manager_id INT,
  department_id INT,
  FOREIGN KEY (role_id) REFERENCES roles (role_id),
--   FOREIGN KEY (manager_id) REFERENCES managers (manager_id),
  FOREIGN KEY (department_id) REFERENCES departments (department_id)
);
