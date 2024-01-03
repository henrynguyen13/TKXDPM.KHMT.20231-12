import HeaderBar from "../../components/layout/HeaderBar";
import HomeSlide from "../../components/carousel/HomeSlide";
import ProductPage from "../products/ProductPage";
export default function HomePage() {
  return (
    <>
      <HeaderBar />
      <HomeSlide />
      <ProductPage />
    </>
  );
}
