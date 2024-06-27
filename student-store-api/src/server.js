require('dotenv').config(); // Make sure this line is at the top of your server.js file

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