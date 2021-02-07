const express = require('express');
const routes = express.Router();
const { celebrate } = require('celebrate');

const UsersController = require('./controllers/UsersController');
const UserValidate = require('./validators/UsersValidator');

const CountriesController = require('./controllers/CountriesController');

const CitiesController = require('./controllers/CitiesController');

//Users
routes.post('/users', celebrate(UserValidate.createUser), UsersController.create);
routes.get('/users', UsersController.index);
routes.put('/users/:name', UsersController.update);
routes.delete('/users/:name', UsersController.delete);

//Countries

//Cities

module.exports = routes;