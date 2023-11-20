"use strict";

require('dotenv').config();

var connectDB = require('./db');

var Product = require('./models/products');

var jsonProducts = require('./products.json');

var start = function start() {
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(connectDB(process.env.MONGO_URI));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(Product.deleteMany());

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(Product.create(jsonProducts));

        case 7:
          console.log('Success');
          process.exit(0);
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          process.exit(1);
          console.log(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

start();