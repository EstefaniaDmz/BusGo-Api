const express = require('express');
const routes = express.Router();

routes.get('/:id', (req, res) => {
    const idCiudad = req.params.id;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        conn.query('SELECT * FROM vw_rutasciudades WHERE idCiudad=' + idCiudad, (err, rows)=> {
            if(err){
                return res.send(err);
            };
            res.json(rows);
        });
    });
});

module.exports = routes;