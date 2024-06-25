const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all orders
const getAllOrders = async () => {
    return prisma.orders.findMany();
}

// Function to get a order by ID
const getOrderById = async (id) => {
    return prisma.orders.findUnique({ where: { id: parseInt(id) } });
};

// Function to create a new product
const createNewOrder = async (orderData) => {
    return prisma.orders.create({ data: orderData });
};

// Function to update a product
const updateOrder = async (id, orderData) => {
    return prisma.orders.update({
        where: { id: parseInt(id) },
        data: orderData,
    });    
};

// Function to delete a product
const deleteOrder = async (id) => {
    return prisma.orders.delete({ where: { id: parseInt(id) } });
};

// Exporting the functions
module.exports = {
    getAllOrders,
    getOrderById,
    createNewOrder,
    updateOrder,
    deleteOrder,
};