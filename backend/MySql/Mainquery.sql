SET NAMES utf8 COLLATE utf8_general_ci;
CREATE DATABASE IF NOT EXISTS puntoVenta;
USE puntoVenta;

-- Creacion de tablas --

CREATE TABLE productos (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  precioVenta DOUBLE NOT NULL
  );
  
CREATE TABLE clientes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(255) NOT NULL,
  correoElectronico VARCHAR(255) NOT NULL
);

CREATE TABLE proveedores (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  Telefono VARCHAR(255) NOT NULL,
  correoElectronico VARCHAR(255) NOT NULL
);

CREATE TABLE ventas (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  
  FOREIGN KEY (idProducto) REFERENCES productos(id)
);

CREATE TABLE inventario (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  
  FOREIGN KEY (idProducto) REFERENCES productos(id)
);

-- Creacion de triggers y vistas --

CREATE VIEW vistaInventario AS
  SELECT id, (SELECT nombre FROM productos WHERE productos.id = inventario.idProducto), cantidad FROM inventario GROUP BY id;
  
CREATE TRIGGER insertar_en_inventario
  AFTER INSERT
  ON productos FOR EACH ROW
  INSERT INTO inventario (idProducto, cantidad) VALUES ( new.id , 0);
 
-- Inserts --

INSERT INTO productos (nombre, precioVenta) VALUES ('Coca-Cola',15.10),
('Chocolate', 10.00),
('Aguacate', 20.00),
('Croquetas', 120.00),
('Cereal', 80.00),
('Agua', 10.00),
('Papas', 12.00);

INSERT INTO clientes (nombre, telefono, correoElectronico) VALUES ('El Arte','3315181919', 'compras@elartemx.com'),
('CHAI','3328271627', 'compras@chai.com'),
('Ramon Lopez','3365842515', 'ramonlopez@hotmail.com'),
('Alejandra Juarez','3316452536', 'aleju@gmail.com'),
('Abarrotes Mary','3338095259', 'marylopez@gmail.com');


INSERT INTO proveedores (nombre, telefono, correoElectronico) VALUES ('Coca-Cola','3323242628', 'ventas@cocacola.com'),
('Sabritas','3316054585', 'ventas@sabritasmx.com'),
('Dog Chow','3312148595', 'ventas@dogchow.com'),
('Ciel','3316478462', 'ventas@cielmx.com'),
('Mercado Abastos','3314768241', 'ramonjimenez@gmail.com');
