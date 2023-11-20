require('dotenv').config();
require('express-async-errors');


const express = require('express');
const connectDB = require('./db');
const productRouter = require('./routes/products');

const app = express();

app.use(express.json());


// routes
const port = 3000;
app.get('/',(req, res) => {
    res.send('<h1> Store Api </h1> <a href="/api/v1/products">products</a>');
})

app.use('/api/v1/products', productRouter)

const start = async() => {
    try {
        // connect DB
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`server is listening at port ${port}`))
    } catch (error) {
        console.log("Error", error);
        res.send(404);
    }
}

start();

