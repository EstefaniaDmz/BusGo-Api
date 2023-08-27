const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
/*const ciudad = require('./controller/ciudad');
const parada = require('./controller/parada');
const ruta = require('./controller/ruta');
const bus = require('./controller/bus');*/

const user = require('./controller/user');
const vwParada = require('./controller/vwParada');
const vwBus = require('./controller/vwBus');

const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'busgoo'
};

app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());

/*app.use('/ciudad', ciudad);

app.use('/parada', parada);

app.use('/bus', bus);

app.use('/ruta', ruta);*/

app.use('/usuario', user);
app.use('/vwParada', vwParada);
app.use('/vwBus', vwBus);

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(app.get('port'), ()=> {
    console.log('Servidor funcionando en puerto ', app.get('port'));
});