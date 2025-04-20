const services = require("../internal/app/services");

const stocksHandler = {};

stocksHandler.GetAllStocks = async (req, res) => {
    try {
        const stocks = await services.stocks.GetAllStocks();

        return res.status(200).json({
            message: "Stocks fetched successfully",
            data: stocks,
        });

    } catch (error) {
        console.error("Error fetching stocks:", error.message);

        return res.status(500).json({
            message: `Failed to fetch stocks: ${error.message}`,
            data: null,
        });
    }
};

stocksHandler.UpdateStock = async (req, res) => {
    try {

        const { productId, price, sellingQuantity, prevStockData } = req.body;
        if (!productId || !price || !sellingQuantity || !prevStockData) {
            return res.status(400).json({
                message: "Missing required fields: productId, price, sellingQuantity, or prevStockData",
                data: null,
            });
        }

        const result = await services.stocks.SellStock(productId, price, sellingQuantity, prevStockData);

        return res.status(200).json({
            message: result.message,
            data: result.data,
        });

    } catch (error) {

        console.log(`Error updating Stocks: ${error.message}`);

        return res.status(500).json({
            message: `Failed to update stocks: ${error.message}`,
            data: null,
        })
    }
}

module.exports = stocksHandler;