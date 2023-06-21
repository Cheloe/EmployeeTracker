SELECT e.employee_id, e.employee_name, r.role_name, d.department_name, m.employee_name AS manager_name
FROM employees e
JOIN roles r ON e.role_id = r.role_id
JOIN departments d ON e.department_id = d.department_id
LEFT JOIN employees m ON e.manager_id = m.employee_id
LEFT JOIN employees mm ON m.manager_id = mm.employee_id;
