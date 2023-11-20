"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Product = require('../models/products');

var getAllProductsStatic = function getAllProductsStatic(req, res) {
  var products;
  return regeneratorRuntime.async(function getAllProductsStatic$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product.find({}).sort('name').select('name price').limit(10).skip(4));

        case 2:
          products = _context.sent;
          res.status(200).json({
            msg: products,
            nbHIts: products.length
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getAllProducts = function getAllProducts(req, res) {
  var _req$query, featured, company, name, sort, fields, numericfilters, queryObject, operatorMap, regEx, filters, options, result, sortedList, sortedFields, page, limit, skip, products;

  return regeneratorRuntime.async(function getAllProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // console.log(req.query);
          _req$query = req.query, featured = _req$query.featured, company = _req$query.company, name = _req$query.name, sort = _req$query.sort, fields = _req$query.fields, numericfilters = _req$query.numericfilters;
          queryObject = {};

          if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
          }

          if (company) {
            queryObject.company = company;
          }

          if (name) {
            queryObject.name = {
              $regex: name,
              $options: 'i'
            };
          }

          if (numericfilters) {
            console.log(numericfilters);
            operatorMap = {
              '>': '$gt',
              '>=': '$gte',
              '=': '$eq',
              '<': '$lt',
              '<=': '$lte'
            };
            regEx = /\b(>|<|>=|<=|=)\b/g;
            filters = numericfilters.replace(regEx, function (match) {
              return "-".concat(operatorMap[match], "-");
            });
            options = ['price', 'rating'];
            filters = filters.split(',').forEach(function (item) {
              var _item$split = item.split('-'),
                  _item$split2 = _slicedToArray(_item$split, 3),
                  field = _item$split2[0],
                  operator = _item$split2[1],
                  value = _item$split2[2];

              if (options.includes(field)) {
                queryObject[field] = _defineProperty({}, operator, Number(value));
              }
            });
          }

          result = Product.find(queryObject);

          if (sort) {
            sortedList = sort.split(',').join(' ');
            result.sort(sortedList);
          } else {
            result.sort('createdAt');
          }

          if (fields) {
            sortedFields = fields.split(',').join(' ');
            result.select(sortedFields);
          }

          console.log(queryObject);
          page = Number(req.query.page) || 1;
          limit = Number(req.query.limit) || 10;
          skip = (page - 1) * limit;
          result = result.skip(skip).limit(limit);
          _context2.next = 16;
          return regeneratorRuntime.awrap(result);

        case 16:
          products = _context2.sent;
          res.status(200).json({
            products: products,
            nbHits: products.length
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  getAllProductsStatic: getAllProductsStatic
};