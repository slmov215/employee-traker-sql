-- Drops the inventory_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;
-- Creates the inventory_db database --
CREATE DATABASE employee_db;

-- use inventory_db database --
USE employee_db;

-- Creates the table "produce" within inventory_db --
/* CREATE TABLE department (
  -- Creates a numeric column called "id" --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "department_name" which cannot contain null --
  name VARCHAR(30) NOT NULL
); */
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) 
        REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT 
        REFERENCES employee(id) ON DELETE SET NULL,
    FOREIGN KEY (role_id) 
        REFERENCES role(id) ON DELETE SET NULL
);