const productsModel = require('./products')
const stocksModel = require('./stocks')

const model = {};

model.products = productsModel;
model.stocks = stocksModel;

productsModel.hasOne(stocksModel, { foreignKey: 'productId', });
stocksModel.belongsTo(productsModel, { foreignKey: 'productId' });

module.exports = model;