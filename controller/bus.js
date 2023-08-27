const express = require('express');
const routes = express.Router();

routes.get('/:id', (req, res) => {
    const idRuta = req.params.id;
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        };
        conn.query('SELECT * FROM bus WHERE estatus=1 and idRuta=' + idRuta, (err, rows)=> {
            if(err){
                return res.send(err);
            };
            res.json(rows);
        });
    });
});

module.exports = routes;