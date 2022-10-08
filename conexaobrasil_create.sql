DROP DATABASE IF EXISTS conexaobrasil_db;
CREATE DATABASE conexaobrasil_db;
USE conexaobrasil_db;

-- Estructura de la tabla de USUARIOS
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  full_name varchar(100) NOT NULL,
  phone_number varchar(20),
  email varchar(50) NOT NULL,
  password varchar(100) NOT NULL,
  avatar varchar(200) DEFAULT NULL,
  role varchar(45) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
  );
  