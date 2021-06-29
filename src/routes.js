const { Router } = require('express');
const DeveloperController = require('./controllers/DeveloperController');
const validateAll = require('./middlewares/validateAll');

const developer = new Router();

developer.post('/developer', validateAll, DeveloperController.store);
developer.get('/developer/:id', DeveloperController.getById);

module.exports = developer;
