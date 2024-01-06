import CartPage from "./features/carts/CartPage";
import HomePage from "./features/home/HomePage";
import DeliveryPage from "./features/delivery/DeliveryPage";
import ProductDetailPage from "./features/products/ProductDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NumProductProvider } from "./features/carts/NumProductInCartContext";
import InvoicePage from "./features/invoice/InvoicePage";
import HistoryPage from "./features/invoice/HistoryPage";
import { CartProvider } from "./features/carts/CartContext";
import ResultPage from "./features/result/ResultPage";

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
              <Route path="/invoice/:orderId" element={<InvoicePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </NumProductProvider>
    </>
  );
}
