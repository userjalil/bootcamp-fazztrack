// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

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
