import CartPage from "./features/carts/CartPage";
import HomePage from "./features/home/HomePage";
import ProductDetailPage from "./features/products/ProductDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NumProductProvider } from "./features/carts/NumProductInCartContext";
import InvoicePage from "./features/invoice/InvoicePage";

export default function App() {
  return (
    <>
      <NumProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/invoice" element={<InvoicePage/>}/>
            <Route path="/*" element={<InvoicePage/>}/>
          </Routes>
        </Router>
      </NumProductProvider>
    </>
  );
}
