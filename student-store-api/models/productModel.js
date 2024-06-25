const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Helper Function - Sorting Products
const sortProducts = (sortQuery) => {
    switch (sortQuery) {
        case 'price':
            return { price: 'asc' };
        case 'name':
            return { name: 'asc' };
        default:
            return null; // Return null for default sort (by id)
    }
};

// Function to get all products optionally filtered by category and sorted
const getAllProducts = async (categoryQuery, sortQuery) => {
    console.log("Category query:", categoryQuery);
    console.log("Sort by:", sortQuery);

    let products;

    // Default sort by id if sortQuery is not provided or is invalid
    const defaultSort = { id: 'asc' };

    if (categoryQuery) {
        products = await prisma.products.findMany({
            where: { category: { equals: categoryQuery.toLowerCase() } },
            orderBy: sortProducts(sortQuery) || defaultSort 
        });
    } else {
        products = await prisma.products.findMany({
            orderBy: sortProducts(sortQuery) || defaultSort
        });
    }

    return products;
};

// Function to get a product by ID
const getProductById = async (id) => {
    return prisma.products.findUnique({ where: { id: parseInt(id) } });
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
