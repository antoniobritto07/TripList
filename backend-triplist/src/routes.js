const express = require('express');
const routes = express.Router();

const UsersController = require('./controllers/UsersController');
const CountriesController = require('./controllers/CountriesController');
const CitiesController = require('./controllers/CitiesController');

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);
routes.delete('/users/:name', UsersController.delete);

module.exports = routes;