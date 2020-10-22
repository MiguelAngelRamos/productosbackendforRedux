const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = parseInt(process.env.port, 10) || 8010;
app.use( function (req, res, next){
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// rutas
require('./router/producto')(app);

// Conexión a la base de datos
mongoose.connection.openUri( "mongodb://localhost:27017/reduxDB", { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if(err) throw err;
  console.log('Base de datos :\x1b[32m%s\x1b[0m', 'online');
  app.listen(port, () => {
    console.log('Express Server corriendo en el puerto', port);
  })
});

