const productModel = require('../model/products')

const productRepo = {};

productRepo.CreateProduct = async (data, transaction = null) => {
    return await productModel.create(data, transaction ? { transaction } : {});
};

productRepo.GetAllproductModel = async () => {
    return await productModel.findAll();
};

productRepo.GetProductById = async (id) => {
    return await productModel.findOne(
        {
            where: {
                id
            }
        }
    );
};

productRepo.UpdateProduct = async (id, updateData, transaction = null) => {
    const [rowsAffected] = await productModel.update(
        updateData,
        {
            where: {
                id
            },
        },
        { ...transaction && { transaction } }
    );

    return rowsAffected;
};

productRepo.DeleteProduct = async (id) => {
    return await productModel.destroy(
        {
            where: {
                id
            }
        }
    );
};

module.exports = productRepo;