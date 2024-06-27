import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";

function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: "" });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsFetching(true);
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setIsFetching(false);
      } catch (error) {
        setError(error.message);
        setIsFetching(false);
      }
    }

    fetchProducts();
  }, []);

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    try {
      setIsCheckingOut(true);
  
      // Fetch products (assuming fetchProducts() function fetches all products)
      const response = await axios.get("http://localhost:3000/products");
      const products = response.data;
  
      // Prepare order items
      const orderItems = Object.keys(cart).map((key) => ({
        product_id: parseInt(key),
        quantity: cart[key],
        price: 0, // Initially set to 0
      }));
  
      // Update prices in orderItems based on fetched products
      orderItems.forEach((item) => {
        const product = products.find((product) => product.id === item.product_id);
        if (product) {
          item.price = product.price; // Set the correct price from fetched products
        } else {
          throw new Error(`Product with id ${item.product_id} not found`);
        }
      });
  
      // Calculate total price based on order items
      let totalPrice = orderItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  
      // Prepare order data with a default customer_id
      const orderData = {
        customer_id: 1, // Replace with your default customer_id value
        status: "pending", // Example status, adjust as needed
        total_price: totalPrice,
        OrderItem: orderItems,
      };
  
      console.log("orderData");
      console.log(orderData);
      // Make POST request to create order
      const orderResponse = await axios.post("http://localhost:3000/orders", orderData);
  
      // Handle success
      setOrder(orderResponse.data);
      setCart({});
      setIsCheckingOut(false);
      setError(null);
    } catch (error) {
      // Handle error
      setError(error.message);
      setIsCheckingOut(false);
    }
  };
  
  
  

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
