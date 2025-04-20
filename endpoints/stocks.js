const express = require('express');
const handler = require('../handlers');
const router = express.Router();

router.get("/stocks", handler.stocks.GetAllStocks);
router.put("/stock", handler.stocks.UpdateStock);

module.exports = router;
