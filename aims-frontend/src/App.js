import CartPage from "./features/carts/CartPage";
import HomePage from "./features/home/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NumProductProvider } from "./features/carts/NumProductInCartContext";

export default function App() {
  return (
    <>
      <NumProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </NumProductProvider>
    </>
  );
}
