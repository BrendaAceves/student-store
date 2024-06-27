const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to get all products optionally filtered by category and sorted
const getAllProducts = async (filter = {}, orderBy = {}) => {
    return prisma.products.findMany({
        where: filter,
        orderBy: orderBy,
    });
};

// Function to get a product by ID
const getProductById = async (id) => {
    return prisma.products.findUnique({ 
        where: { id: parseInt(id) },  
    });
};

// Function to create a new product
const createNewProduct = async (productData) => {
    return prisma.products.create({ data: productData });
};

// Function to update a product
const updateProduct = async (id, productData) => {
    return prisma.products.update({
        where: { id: parseInt(id) },
        data: productData,
    });    
};

// Function to delete a product
const deleteProduct = async (id) => {
    return prisma.products.delete({ where: { id: parseInt(id) } });
};

// Exporting the functions
module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
};
