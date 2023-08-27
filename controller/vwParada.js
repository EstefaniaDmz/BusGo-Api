const express = require('express');
const routes = express.Router();

routes.get('/parada/:idParada', (req, res) => {
    const idParada = req.params.idParada;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        conn.query(`SELECT * FROM vw_paruci WHERE idParada=${idParada}`, (err, rows)=> {
            if(err){
                return res.send(err);
            };
            res.json(rows);
        });
    });
});

routes.get('/ruta/:idCiudad', (req, res) => {
    const idCiudad = req.params.idCiudad;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        conn.query(`SELECT * FROM vw_RutasCiudades WHERE idCiudad=${idCiudad} order by Ruta`, (err, rows)=> {
            if(err){
                return res.send(err);
            };
            res.json(rows);
        });
    });
});

routes.get('/paradas/:idRuta', (req, res) => {
    const idRuta = req.params.idRuta;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
            
        };
        conn.query(`SELECT idParada, paradaNumero, calle, colonia, latitude, longitude, tiempo, idRuta FROM vw_paruci WHERE idRuta=${idRuta} order by paradaNumero`, (err, rows)=> {
            if(err){
                return res.send(err);
            };
            res.json(rows);
        });
    });
});


module.exports = routes;