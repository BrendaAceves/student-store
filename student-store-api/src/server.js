const PORT = 3000;
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");


//import product routes
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");

// Middleware
const app = express();
app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev"));
app.use(express.json()); //Enable the use of JSON data


// Defining Methods
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('hiiii!');
})

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);





// /* Product Endpoints. All tested and fully functional */

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

// // Fetch specific product details by id. USAGE: http://localhost:3000/products/2
// app.get('/products/:productId', (req, res) => {
//     const productId = parseInt(req.params.productId);
//     const product = products.find(product => product.id === productId);

//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).send('Product not found');
//     }
// })

// // Add a new product to the database.
// app.post('/products', (req, res) => {
//     const {} = req.body

//     const { id, name, description, price, image_url, category } = req.body;
//     console.log(req.body);

//     const newProduct = {
//         id: products.length + 1,
//         name,
//         description,
//         price,
//         image_url,
//         category
//     }

//     products.push(newProduct);
//     res.status(201).json(newProduct);

// })

// // Update the details of an existing product
// app.put('/products/:productId', (req, res) => {
//     const {} = req.body

//     const { id, name, description, price, image_url, category } = req.body;
//     console.log(req.body);

//     const newProduct = {
//         id: products.length + 1,
//         name,
//         description,
//         price,
//         image_url,
//         category
//     }

//     products.push(newProduct);
//     res.status(201).json(newProduct);

// })

// // Remove a product from the database
// app.delete('/products/:productId', (req, res) => {
//     let { productId } = req.params;
//     let initialLength = products.length;
    
//     // Filter out the product with the given productId
//     let updatedProducts = products.filter(product => product.id !== parseInt(productId));

//     // Check if a product was actually removed
//     if (updatedProducts.length < initialLength) {
//         // Update the products array with the filtered array
//         products = updatedProducts;
//         res.status(204).send(products);
//     } else {
//         res.status(404).send('Product not found');
//     }
// });


// // Handle 404 - Not Found
// app.use((req, res, next) => {
//     res.status(404).send("Sorry! Page not found.... :(");
// });



// /*
// Project clarification:
// dont do npm init -y
// -replace package.json with the starter code
// -skip creating server.js (located in src)
// */

// /* Order endpoints */

// // Fetch all orders
// app.get('/orders', (req, res) => {
//     console.log("In orders"); // Check if this logs in your console
//     res.send("test");
// });

// // Get orders by ID
// app.get('/orders/:orderId', (req, res) => {
//     const orderId = parseInt(req.params.orderId);
//     const order = orders.find(order => order.order_id === orderId); // Use order_id for comparison

//     if (order) {
//         res.json(order);
//     } else {
//         res.status(404).send('Order not found');
//     }
// });


// // Add a new product to the database.
// app.post('/orders', (req, res) => {
//     const {} = req.body

//     const { order_id, customer_id, total_price, status, created_at } = req.body;
//     console.log(req.body);

//     const newProduct = {
//         order_id: orders.length + 1,
//         customer_id,
//         total_price,
//         status,
//         created_at
//     }

//     orders.push(newProduct);
//     res.status(201).json(newProduct);

// })

// // Update the details of an existing product
// app.put('/orders/:orderId', (req, res) => {
//     const {} = req.body

//     const { order_id, customer_id, total_price, status, created_at } = req.body;
//     console.log(req.body);

//     const newProduct = {
//         order_id: orders.length + 1,
//         customer_id,
//         total_price,
//         status,
//         created_at
//     }

//     orders.push(newProduct);
//     res.status(201).json(newProduct);

// })

// // Remove a product from the database: UPDATE
// app.delete('/orders/:orderId', (req, res) => {
//     let { orderId } = req.params;
//     let initialLength = orders.length;
    
//     // Filter out the product with the given productId
//     let updatedOrders = orders.filter(order => order.order_id !== parseInt(orderId));

//     // Check if a product was actually removed
//     if (updatedOrders.length < initialLength) {
//         // Update the products array with the filtered array
//         orders = updatedOrders;
//         res.status(204).send(orders);
//     } else {
//         res.status(404).send('Product not found');
//     }
// });


