const productsHandler = require('./products');
const stocksHandler = require('./stocks');

const handler = {};

handler.products = productsHandler;
handler.stocks = stocksHandler;

module.exports = handler;