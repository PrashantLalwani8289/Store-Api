"use strict";

require('dotenv').config();

require('express-async-errors');

var express = require('express');

var connectDB = require('./db');

var productRouter = require('./routes/products');

var app = express();
app.use(express.json()); // routes

var port = 3000;
app.get('/', function (req, res) {
  res.send('<h1> Store Api </h1> <a href="/api/v1/products">products</a>');
});
app.use('/api/v1/products', productRouter);

var start = function start() {
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(connectDB(process.env.MONGO_URI));

        case 3:
          app.listen(port, console.log("server is listening at port ".concat(port)));
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log("Error", _context.t0);
          res.send(404);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

start();