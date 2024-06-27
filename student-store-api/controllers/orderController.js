const orderModel = require("../models/orderModel");

// Get All Products
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get product by id
const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.getOrderById(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to create a new product
const createNewOrder = async (req, res) => {
    try {
        const newOrder = await orderModel.createNewOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to update a order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderModel.updateOrder(req.params.id, req.body);
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to delete a product
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await orderModel.deleteOrder(req.params.id);
        if (deletedOrder) {
            res.status(200).json(deletedOrder);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const addItemsToOrder = async (req, res) => {
    const order_id = req.params.id;
    const orderItems = req.body;
    console.log("Order Items:", orderItems);
    try {
        const updatedOrder = await orderModel.addItemsToOrder(order_id, orderItems);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to calculate and return total price of an order
const getTotalPrice = async (req, res) => {
    try {
        const totalPrice = await orderModel.getTotalPrice(req.params.order_id);
        res.status(200).json({ total_price: totalPrice });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Export the functions
module.exports = {
    getAllOrders,
    getOrderById,
    createNewOrder,
    updateOrder,
    deleteOrder,
    addItemsToOrder,
    getTotalPrice,
};
