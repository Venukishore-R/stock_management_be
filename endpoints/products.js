const express = require('express');
const router = express.Router();

const handlers = require('../handlers/index');

router.get("/health", function (req, res) {
    res.send("OK...")
})

router.get("/products", handlers.products.GetAllProducts);
router.post("/product", handlers.products.CreateProduct);
router.put("/product", handlers.products.UpdateProduct);
router.delete("/product", handlers.products.DeleteProduct);

module.exports = router