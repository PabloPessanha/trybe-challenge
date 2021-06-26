const express = require('express');
const developerController = require('./controllers/developerController');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/', developerController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Running on port:', PORT);
});
