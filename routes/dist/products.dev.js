"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/products'),
    getAllProducts = _require.getAllProducts,
    getAllProductsStatic = _require.getAllProductsStatic;

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);
module.exports = router;