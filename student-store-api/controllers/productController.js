const productModel = require("../models/productModel");

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        let categoryQuery = req.query.category ? req.query.category : null;
        let sortQuery = req.query.sort ? req.query.sort: null;
        const products = await productModel.getAllProducts(categoryQuery, sortQuery);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// // Fetch all products
// app.get('/products', (req, res) => {
//     let filteredProducts = [...products];
//     console.log("Products", products);

//     // Update route to filter by category and sorting by price or name
//     if (req.query.category) {
//         console.log("User made a category request query:", req.query.category);
    
//     filteredProducts = filteredProducts.filter(
//         (product) => product.category.toLowerCase() === req.query.category.toLowerCase()
//     );
//     }
//     // Implement sorting by price or name
//     if (req.query.sort) {
//         let sortBy = req.query.sort;
//         console.log(sortBy);

//         if (sortBy.toLowerCase() === 'price') {
//             console.log("Sort by price");
//             filteredProducts.sort((a,b) => a.price - b.price);
//         } 
//         else if (sortBy.toLowerCase() === 'name') {
//             console.log("Sort by name");
//             filteredProducts.sort((a,b) => a.name.localeCompare(b.name));            
//         }
//     }
//     res.json(filteredProducts);

// })


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
