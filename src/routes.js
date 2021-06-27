const { Router } = require('express');
const DeveloperController = require('./controllers/DeveloperController');

const developer = new Router();

developer.post('/developer', DeveloperController.store);

module.exports = developer;
