const productsRepo = require('./products');
const stocksRepo = require('./stocks');

const repo = {};

repo.products = productsRepo;
repo.stocks= stocksRepo;

module.exports = repo;