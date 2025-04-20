const model = require('../model');
const stocksModel = require('../model/stocks');

const stocksRepo = {};

stocksRepo.CreateStock = async (data, transaction = null) => {
    return await stocksModel.create(data, transaction ? { transaction } : {});
};

stocksRepo.GetAllStocks = async () => {
    return await stocksModel.findAll({
        include: [{
            model: model.products,
            attributes: ['id', 'name', 'price', 'quantity', 'type', 'vendor'],
        }]
    });
};

stocksRepo.GetStockByProductId = async (productId) => {
    return await stocksModel.findOne(
        {
            where: {
                productId
            }
        }
    );
};

stocksRepo.UpdateStock = async (productId, updateData, transaction = null) => {
    const [rowsAffected] = await stocksModel.update(updateData, {
        where: { productId },
        ...(transaction && { transaction })
    });

    return rowsAffected;
};


module.exports = stocksRepo;