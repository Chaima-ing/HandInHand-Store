import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx";
import ProductDetails from "../components/ProductDetails.jsx";
import SimilarProducts from "../components/SimilarProducts.jsx";

const CheckoutProduct = () => {
    return (
      <div className="bg-white">
          <Header />
          <ProductDetails />
          <SimilarProducts />
          <Footer />
      </div>
    );
}

export default CheckoutProduct;