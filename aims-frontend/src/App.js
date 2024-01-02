import CartPage from "./features/carts/CartPage";
import HomePage from "./features/home/HomePage";
import DeliveryPage from "./features/delivery/DeliveryPage";
import ProductDetailPage from "./features/products/ProductDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NumProductProvider } from "./features/carts/NumProductInCartContext";

export default function App() {
  return (
    <>
      <NumProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
          </Routes>
        </Router>
      </NumProductProvider>
    </>
  );
}
