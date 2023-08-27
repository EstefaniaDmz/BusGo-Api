const express = require('express');
const routes = express.Router();

routes.get('/ruta/:idRuta', (req, res) => {
    const idRuta = req.params.idRuta;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        conn.query(`SELECT * FROM vw_buchru WHERE idRuta=${idRuta}`, (err, rows)=> {
            if(err){
                return res.send(err);
            };
            res.json(rows);
        });
    });
});

module.exports = routes;