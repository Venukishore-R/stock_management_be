const db = require("../../database/db");
const repo = require("../repository");

const stocksService = {};

stocksService.GetAllStocks = async () => {
    try {
        const stocks = await repo.stocks.GetAllStocks();

        return stocks;
    } catch (error) {

        console.error("Error fetching stocks: ", error.message);
        throw new Error("Failed to retrieve stocks");

    }
};

stocksService.SellStock = async (productId, price, sellingQuantity, prevStockData) => {

    const date = new Date();
    const transaction = await db.transaction();

    const stockUpdateData = {
        "productId": productId,
        "itemsSold": prevStockData.itemsSold + sellingQuantity,
        "revenueGenerated": (prevStockData.revenueGenerated) + (price * sellingQuantity),
        "updated_at": date,
    }

    const productUpdateData = {
        "quantity": prevStockData.stockQuantity - sellingQuantity,
        "updated_at": date,
    }

    try {
        if (prevStockData.stockQuantity < sellingQuantity) {
            throw new Error(`Insufficient stock to sell ${sellingQuantity} items`);
        }

        const stockUpdateReuslt = await repo.stocks.UpdateStock(productId, stockUpdateData, transaction);
        if (stockUpdateReuslt == 0) {
            throw new Error(`Stock with ProductID ${productId} not found or no changes made.`);
        }

        const productUpdateResult = await repo.products.UpdateProduct(productId, productUpdateData, transaction);
        if (productUpdateResult == 0) {
            throw new Error(`Prodcut with Id ${productId} not found or no changes made.`);
        }

        await transaction.commit();

        return {
            "message": "Stock Updated Successfully",
            "data": stockUpdateData
        }

    } catch (error) {
        await transaction.rollback();
        throw new Error(`Stock update failed: ${error.message}`);
    }

}

module.exports = stocksService;