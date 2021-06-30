const { Router } = require('express');
const DeveloperController = require('./controllers/DeveloperController');
const validateAll = require('./middlewares/validateAll');

const developer = new Router();

developer.post('/developer', validateAll, DeveloperController.store);
developer.get('/developer', DeveloperController.getAllUsers);
developer.get('/developer/:id', DeveloperController.getById);
developer.delete('/developer/:id', DeveloperController.delete);

module.exports = developer;
