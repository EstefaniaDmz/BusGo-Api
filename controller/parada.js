const express = require('express');
const routes = express.Router();

routes.get('/marcas/:idRuta', (req, res) => {
    const idRuta = req.params.idRuta;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        conn.query(`SELECT * FROM parada WHERE estatus=1 and idRuta=${idRuta} order by numero`, (err, rows)=> {
            if(err){
                return res.send(err);
            };
            res.json(rows);
        });
    });
});

routes.get('/:idRuta', (req, res) => {
    const idRuta = req.params.idRuta;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        conn.query(`SELECT nombre, longitude, latitude FROM parada WHERE estatus=1 and idRuta=${idRuta} order by numero`, (err, rows)=> {
            if(err){
                return res.send(err);
            };
            res.json(rows);
        });
    });
});

module.exports = routes;