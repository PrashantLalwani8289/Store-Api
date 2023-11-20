const Product = require('../models/products');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('name').select('name price').limit(10).skip(4);
    res.status(200).json({msg : products, nbHIts : products.length});
}

const getAllProducts = async (req, res) => {
    // console.log(req.query);
    const {featured, company, name, sort, fields, numericfilters} = req.query;
    const queryObject = {};
    if (featured ){
        queryObject.featured = featured ==='true' ? true : false;
    }
    if (company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex : name , $options : 'i'};
    }

    if(numericfilters){
        console.log(numericfilters)
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte'
        }

        const regEx = /\b(>|<|>=|<=|=)\b/g;
        let filters = numericfilters.replace(regEx,(match) => {
            return `-${operatorMap[match]}-` ;
        })
        
        const options  = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field]={[operator] : Number(value)};
            }
        })
        
     }
    let result =  Product.find(queryObject);
    if(sort){
        let sortedList = sort.split(',').join(' ');
        result.sort(sortedList);
    }
    else{
        result.sort('createdAt');
    }

    if(fields){
        let sortedFields = fields.split(',').join(' ');
        result.select(sortedFields);
    }
    
     console.log(queryObject)
    const page = Number(req.query.page )|| 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1) * limit;
    result = result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({products,nbHits : products.length});
}

module.exports = {
    getAllProducts: getAllProducts,
    getAllProductsStatic: getAllProductsStatic
}