import CartPage from "./features/carts/CartPage";
import HomePage from "./features/home/HomePage";
import DeliveryPage from "./features/delivery/DeliveryPage";
import InvoicePage from "./features/invoice/InvoicePage";
import ProductDetailPage from "./features/products/ProductDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NumProductProvider } from "./features/carts/NumProductInCartContext";
import { CartProvider } from "./features/carts/CartContext";
export default function App() {
  return (
    <>
      <NumProductProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/invoice" element={<InvoicePage />} />
            </Routes>
          </Router>
        </CartProvider>
      </NumProductProvider>
    </>
  );
}
