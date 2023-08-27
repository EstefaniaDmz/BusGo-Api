const express = require('express');
const routes = express.Router();

routes.post('/iniciarsesion', (req, res) => {
    const { email, clave } = req.body;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        conn.query("SELECT id, CONCAT(nombre, ' ', apellido) as 'nombre completo', email, idCiudad, idRol FROM usuario WHERE email='" + email + "' and clave=MD5('" + clave +"');", (err, row)=> {
            if(err){
                return res.send(err);
            };
            res.json(row);
        });
    });
});

routes.post('/crearcuenta', (req, res) => {
    const { email, clave, nombre, apellido, idCiudad } = req.body;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        try {
            conn.query("INSERT INTO usuario(nombre, apellido, email, clave, idCiudad) VALUES('" + nombre +"', '" + email+"', MD5('" + clave + "'), " + idCiudad + ");");
            res.json({mensaje: "todo excelente"});
        } catch (error) {
            res.json(error);
        }
    });
});

module.exports = routes;