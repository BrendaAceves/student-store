const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to get an order by ID along with its OrderItems
const getOrderById = async (order_id) => {
    return prisma.orders.findUnique({ 
        where: { order_id: parseInt(order_id) },
        include: {
            OrderItem: true,
        },
    });
};

// Function to get all orders
const getAllOrders = async () => {
    const orders = await prisma.orders.findMany({
        include: {
            OrderItem: true,
        }
    });
    return orders;
};

// Function to create a new order
const createNewOrder = async (orderData) => {
    console.log(orderData);
    const { OrderItem: orderItems, ...rest } = orderData;
    // Create the order and obtain its ID
    const createdOrder = await prisma.orders.create({
        data: { ...rest, OrderItem: {
                create: orderItems.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        },
        include: {
            OrderItem: true,
        }
    });
    return createdOrder;
};

// Function to update an order
// Function to update an order including its OrderItems
const updateOrder = async (order_id, orderData) => {
    try {
        // Extract OrderItems data from orderData
        const { OrderItem, ...orderDetails } = orderData;

        // Update order details
        const updatedOrder = await prisma.orders.update({
            where: { order_id: parseInt(order_id) },
            data: {
                ...orderDetails,
                OrderItem: {
                    // Update or create OrderItems as necessary
                    upsert: OrderItem.map(item => ({
                        where: { order_item_id: item.order_item_id },
                        create: item,
                        update: item,
                    })),
                },
            },
            include: {
                OrderItem: true, // Ensure to include updated OrderItems in the response
            },
        });

        return updatedOrder;
    } catch (error) {
        throw new Error(`Failed to update order: ${error.message}`);
    }
};

// Function to delete an order
const deleteOrder = async (order_id) => {
    try {
        // Use transaction to ensure atomicity of operations
        await prisma.orderItem.deleteMany({
            where: { order_id: parseInt(order_id) }
        });

        const deletedOrder = await prisma.orders.delete({
            where: { order_id: parseInt(order_id) }
        });

        return deletedOrder;
    } catch (error) {
        throw new Error(`Failed to delete order: ${error.message}`);
    }
};




const addItemsToOrder = async (order_id, orderItems) => {
    // Validate orderItems to ensure it's an array and not empty
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        throw new Error('Order items must be a non-empty array.');
    }
    try {
        // Ensure order exists
        const existingOrder = await prisma.orders.findUnique({
            where: { order_id: parseInt(order_id) }, // Convert order_id to integer
        });
        if (!existingOrder) {
            throw new Error('Order not found.');
        }
        // Create OrderItem entries
        const createdOrderItems = await Promise.all(
            orderItems.map(async (item) => {
                const { product_id, quantity, price } = item;
                const createdItem = await prisma.orderItem.create({
                    data: {
                        order_id: parseInt(order_id), // Convert order_id to integer
                        product_id,
                        quantity,
                        price,
                    },
                });
                return createdItem;
            })
        );
        return createdOrderItems;
    } catch (error) {
        throw new Error(`Failed to add items to order: ${error.message}`);
    }
};



module.exports = {
    getAllOrders,
    getOrderById,
    createNewOrder,
    updateOrder,
    deleteOrder,
    addItemsToOrder,
};
