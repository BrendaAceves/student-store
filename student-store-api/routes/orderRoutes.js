const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Get all products
router.get("/", orderController.getAllOrders);

// Get product by ID
router.get("/:id", orderController.getOrderById);

// Create a new product
router.post("/", orderController.createNewOrder);

// Update a product
router.put("/:id", orderController.updateOrder);

// Delete a product
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
