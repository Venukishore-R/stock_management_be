const productsService = require('./products');
const stocksService = require('./stocks');

const services = {};

services.products = productsService;
services.stocks = stocksService;

module.exports = services;