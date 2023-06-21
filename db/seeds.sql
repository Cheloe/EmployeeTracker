USE employeeTracker_db;

INSERT INTO departments (department_id, department_name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Finance'),
(4, 'Human Resources'),
(5, 'Engineering'), 
(6, 'Design');

INSERT INTO roles (role_id, role_name) VALUES
(1, 'Manager'),
(2, 'Supervisor'),
(3, 'Associate'),
(4, 'Team Lead'),
(5, 'Junior Associate');

INSERT INTO employees (employee_id, employee_name, role_id, manager_id, department_id) VALUES
(1, 'John Smith', 1, NULL, 1),
(2, 'Jane Doe', 2, 1, 1),
(3, 'Michael Johnson', 3, 1, 2),
(4, 'Emily Davis', 3, 2, 2),
(5, 'Robert Brown', 3, 2, 3),
(6, 'Mark Wilson', 2, 4, 1),
(7, 'Sarah Thompson', 3, 5, 1),
(8, 'David Lee', 4, 2, 1),
(9, 'Jennifer Chen', 4, 4, 1),
(10, 'Daniel Kim', 4, 5, 1);
