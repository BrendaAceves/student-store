const productModel = require("../models/productModel");

// Function gets all the cars
const getAllProducts = async (req, res) => {
    const { category, sort } = req.query;
    let filter = {}; //filter object
    let orderBy = {}; //orderBy - asc/desc
    console.log(sort);

    if (category) {
        filter.category = category;
    }

    if (sort) {
        if (sort === "price") {
            console.log("Sort by price");
            orderBy = { price: 'asc'};
        } else if (sort === "name") {
            console.log("Sort by name");
            orderBy = { name: "asc" };
        } else {
            console.log("Sort by id");
            orderBy = { id: "asc" };
        }
    // If the user enters an invalid or no sorting option, sort by id
    } else {
        console.log("Sort by id");
        orderBy = { id: "asc" };
    }

    try {
        const products = await productModel.getAllProducts(filter, orderBy);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Get product by id
const getProductById = async (req, res) => {
    try {
        const product = await productModel.getProductById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to create a new product
const createNewProduct = async (req, res) => {
    try {
        const newProduct = await productModel.createNewProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to update a product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.deleteProduct(req.params.id);
        
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Export the functions
module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
};
