const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()
const cors = require('cors');

const corsOptions ={
    origin:'http://192.168.133.9:4000/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" )
    next();
  });
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devadmin')
})
//get all
app.get('/products' ,async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// get one
app.get('/products/:id',ajaycal, async(req, res) =>{
    try {
        // const {id} = req.params;
        // const product = await Product.findById(id);
        res.status(200).json(res.Product);
    } catch (error) {
        res.status(500).json({message: 'error2'})
    }
})

// add one
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function ajaycal(req, res, next) {
    let product_id
    try {
        product_id = await Product.findById(req.params.id)
        product_id["price"] = product_id["quantity"]*product_id["price"]
      if (product_id == null) {
        return res.status(404).json({ message: 'Cannot find Product' })
      }
    } catch (err) {
      return res.status(500).json({ message: 'hello error' })
    }
  
    res.Product = product_id
    next()
  }


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://AjayAdmin:Ajay512001@restapidev.iylsgal.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})