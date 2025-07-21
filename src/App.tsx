import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Header from "./components/Header";
import Product from "./components/ProductDetails";
import Cart from "./components/Cart";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
