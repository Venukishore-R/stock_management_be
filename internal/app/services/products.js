const productsHandler = require("../../../handlers/products");
const db = require("../../database/db");
const productRepo = require("../repository/index");
const stocksRepo = require("../repository/stocks");

const productsService = {};

productsService.GetAllProducts = async () => {
    try {
        const products = await productRepo.products.GetAllproductModel();
        return products;
    } catch (error) {
        throw new Error(`Failed to retrieve products: ${error.message}`);
    }
};

productsService.CreateProduct = async (productData) => {
    const transaction = await db.transaction();

    try {
        const date = new Date();

        productData.created_at = date;
        productData.updated_at = date;

        const createdProduct = await productRepo.products.CreateProduct(
            productData,
            transaction
        );

        stockData = {
            "productId": productData.id,
            "itemsSold": 0,
            "revenueGenerated": 0,
            "created_at": date,
            "updated_at": date,
        }

        const createdStock = await stocksRepo.CreateStock(stockData, transaction);
        console.log("Created Stock data: ", createdStock);

        await transaction.commit();

        return createdProduct;
    } catch (error) {

        await transaction.rollback();

        throw new Error("Failed to create product: " + error.message);
    }
};

productsService.UpdateProduct = async (id, updateData, transaction = null) => {
    try {
        updateData.updated_at = new Date();

        const updated = await productRepo.products.UpdateProduct(id, updateData, transaction);

        if (updated === 0) {
            throw new Error(`Product with ID ${id} not found or no changes made.`);
        }

        return { message: "Product updated successfully" };
    } catch (error) {
        throw new Error("Failed to update product: " + error.message);
    }
};

productsService.DeleteProduct = async (id) => {
    try {

        const result = await productRepo.products.DeleteProduct(id);
        return result;

    } catch (error) {
        throw new Error(`Service error while deleting product: ${error.message}`);
    }
}


module.exports = productsService;
