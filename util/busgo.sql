CREATE DATABASE BusGo;

USE BusGO;

CREATE TABLE Bus(
    id int AUTO_INCREMENT PRIMARY KEY,
    placa varchar (30) not null,
    numero varchar (10) not null,
    idRuta int not null,
    idChofer int not null,
    estatus bit default 1 not null,
    FOREIGN KEY (idRuta) REFERENCES Ruta(id),
    FOREIGN KEY (idChofer) REFERENCES Chofer(id)
);

CREATE TABLE BuzonQueja(
    id int AUTO_INCREMENT PRIMARY KEY,
    queja varchar (255) not null,
    fecha datetime not null, 
    idUsuario int not null,
    idBus int not null,
    estatus bit default 1 not null,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idBus) REFERENCES Bus(id)
);

CREATE TABLE Ciudad(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(20) not null,
    estatus bit default 1 not null
);

CREATE TABLE Chofer(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar (50) not null,
    apellidoMaterno varchar (50) not null,
    apellidoPaterno varchar (50) not null,
    licencia varchar (100) not null,
    estatus bit default 1 not null
);

CREATE TABLE Parada(
    id int AUTO_INCREMENT PRIMARY KEY,
    numero int not null,
    calle varchar (100) not null, 
    colonia varchar(100) not null,
    longitude varchar (15) not null,
    latitude varchar(15) not null,
    tiempo int not null,
    idCiudad int not null,
    idRuta int not null,
    estatus bit default 1 not null,
    FOREIGN KEY (idCiudad) REFERENCES Ciudad(id),
    FOREIGN KEY (idRuta) REFERENCES Ruta(id)
);

CREATE TABLE RolUsuario(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar (50) not null,
    descripcion varchar (150) not null,
    estatus bit default 1 not null
);

CREATE TABLE Ruta(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar (100) not null,
    estatus bit default 1 not null
);

CREATE TABLE Usuario(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar (50) not null,
    apellido varchar (50) not null,
    email varchar (255) not null,
    clave varbinary (32) not null,
    idCiudad int not null,
    idRol int default 3 not null,
    estatus bit default 1 not null,
    FOREIGN KEY (idCiudad) REFERENCES Ciudad(id),
    FOREIGN KEY (idRol) REFERENCES RolUsuario(id)
);

CREATE TABLE RutaCiudad(
    id int AUTO_INCREMENT PRIMARY KEY,
    idCiudad int not null,
    idRuta int not null,
    estatus bit default 1 not null,
    FOREIGN KEY (idCiudad) REFERENCES Ciudad(id),
    FOREIGN KEY (idRuta) REFERENCES Ruta(id)
);

CREATE VIEW vw_RutasCiudades as
SELECT r.nombre as 'Ruta', rc.idCiudad as 'idCiudad', r.id as 'idRuta' FROM ruta r INNER JOIN rutaciudad rc on rc.idRuta = r.id WHERE rc.estatus = 1;

--Trampa sjakeljalk--

CREATE VIEW vw_PaRuCi as 
SELECT p.id as 'idParada', p.numero as 'paradaNumero', p.calle, p.colonia, p.latitude, p.longitude, p.tiempo, r.id as 'idRuta', r.nombre as 'ruta', c.id as 'idCiudad', c.nombre as 'ciudad'
FROM Parada p LEFT JOIN Ruta r ON p.idRuta = r.id LEFT JOIN Ciudad c on p.idCiudad = c.id;


CREATE VIEW vw_BuChRu as 
SELECT b.id as 'idBus', b.placa, b.numero as 'busNumero', ch.id as 'idChofer', CONCAT(ch.nombre, ' ', ch.apellidoMaterno) as 'choferNombre', r.id as 'idRuta', r.nombre as 'ruta'
FROM Bus b LEFT JOIN Ruta r ON r.id = b.idRuta LEFT JOIN Chofer ch ON ch.id = b.idChofer;


INSERT INTO Parada(numero, calle, colonia, idCiudad, tiempo, idRuta, estatus, latitude, longitude)
VALUES (10, 'Calle de la fuente', 'Zona centro', 1, 0, 1, 1, '26.9021', '-101.4216'),
(11, 'C. Miguel Blanco con Guerrero sur', 'Zona centro', 1, 2, 1, 1, '26.8998', '-101.4188'),
(12, 'Avenida constitucion Nte.', 'Zona centro', 1, 2, 1, 1, '26.9001', '-101.4136'),
(13, 'Blvd. Harold R. Pape con Moctezuma', 'Carls Jr Monclova', 1, 4, 1, 1, '26.9206',	'-101.4230'),
(14, 'Blvd. Harold R. Pape', 'HEB Monclova', 1, 1, 1, 1, '26.9267', '-101.4182');
