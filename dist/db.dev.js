"use strict";

var mongoose = require('mongoose');

var connectDB = function connectDB(url) {
  mongoose.connect(url);
};

module.exports = connectDB;