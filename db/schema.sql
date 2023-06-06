-- Drops the inventory_db if it exists currently --
DROP DATABASE IF EXISTS employees_db;
-- Creates the inventory_db database --
CREATE DATABASE employees_db;

-- use inventory_db database --
USE employees_db;

-- Creates the table "produce" within inventory_db --
CREATE TABLE departments (
  -- Creates a numeric column called "id" --
  id INT NOT NULL PRIMARY KEY,
  -- Makes a string column called "department_name" which cannot contain null --
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary ,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
);