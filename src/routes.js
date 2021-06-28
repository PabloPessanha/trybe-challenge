const { Router } = require('express');
const DeveloperController = require('./controllers/DeveloperController');
const validateAll = require('./middlewares/validateAll');

const developer = new Router();

developer.post('/developer', validateAll, DeveloperController.store);

module.exports = developer;
