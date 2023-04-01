
// import express from "express"; 

// const app = express(); 

// app.get('/', (req, res) => { 
//     res.send('Halo dunia'); 
// }); 

// app.listen(3000, () => console.log('Express Running at http://localhost:3000'));



// import express from "express";
// const app = express();
 
// app.get('/', (req, res) => {
//     res.send('Halaman Index');
// });
// app.get('/route1', (req, res) => {
//     res.send('Route1 Page');
// });
// app.get('/route2', (req, res) => {
//     res.send('Route2 Page');
// });
 
// app.listen(3000, () => console.log('Express Running at http://localhost:3000'));

// import express from "express";
// import Router from "./routes_express/routes.js";

// const app = express();
// app.use(Router);
 
// app.listen(3000, () => console.log('Express Running at http://localhost:3000'));


const express = require('express')
const bodyParser = require('body-parser');
const router = require('./router/index.js')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
