USE employeeTracker_db;

INSERT INTO departments (department_name) VALUES
('Sales'),
('Marketing'),
('Finance'),
('Human Resources'),
('Engineering'), 
('Design');

INSERT INTO roles (role_name) VALUES
('Manager'),
('Supervisor'),
('Associate'),
('Team Lead'),
('Junior Associate');

INSERT INTO employees (employee_name, role_id, manager_id, department_id) VALUES
('John Smith', 1, NULL, 1),
('Jane Doe', 2, 1, 1),
('Michael Johnson', 3, 1, 2),
('Emily Davis', 3, 2, 2),
('Robert Brown', 3, 2, 3),
('Mark Wilson', 2, 4, 1),
('Sarah Thompson', 3, 5, 1),
('David Lee', 4, 2, 1),
('Jennifer Chen', 4, 4, 1),
('Daniel Kim', 4, 5, 1);
