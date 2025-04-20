const services = require("../internal/app/services");

const productsHandler = {};

productsHandler.GetAllProducts = async (req, res) => {
  try {
    const products = await services.products.GetAllProducts();

    if (!products || products.length === 0) {

      return res.status(404).json({
        message: "No products found"
      });
    }

    return res.status(200).json({
      message: "All products retreived",
      data: products,
    }
    );

  } catch (error) {
    console.log("Error: ", error);

    return res
      .status(500)
      .json({
        message: `Failed to fetch products: ${error.message}`,
        data: null,
      });
  }
};

productsHandler.CreateProduct = async (req, res) => {
  try {
    const productData = req.body;

    if (!productData.id || !productData.name || !productData.description || productData.price == null || productData.quantity == null || !productData.type || !productData.vendor) {
      return res.status(400).json({
        message: "Missing required product fields",
        data: null,
      });
    }

    const createdProduct = await services.products.CreateProduct(productData);

    return res.status(201).json({
      message: "Product created",
      data: createdProduct,
    });

  } catch (error) {
    console.log("Error: ", error);

    return res.status(500).json({
      message: `Failed to create product ${error.message}`,
      data: null,
    });

  }
};

productsHandler.UpdateProduct = async (req, res) => {
  try {
    const { id, update_data } = req.body;

    if (id == null || update_data == null) {
      return res.status(400).json({
        message: "Missing required product fields",
        data: null,
      });
    }

    const result = await services.products.UpdateProduct(id, update_data, null);

    return res.status(200).json({
      message: result.message,
      data: null,
    });

  } catch (error) {
    console.log("Error: ", error.message);

    return res.status(500).json({
      message: `Failed to update product ${error.message}`,
      data: null,
    });

  }
};

productsHandler.DeleteProduct = async (req, res) => {
  try {

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Product ID is required",
        data: null,
      });
    }

    const deleted = await services.products.DeleteProduct(id);

    if (deleted === 0) {
      return res.status(404).json({
        message: "Product not found or already deleted",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      data: null,
    });

  } catch (error) {
    console.log("Error:", error.message);

    return res.status(500).json({
      message: `Failed to delete product: ${error.message}`,
      data: null,
    });
  }
}

module.exports = productsHandler;
