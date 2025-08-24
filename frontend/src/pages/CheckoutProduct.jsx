import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductDetails from "../components/ProductDetails.jsx";
import SimilarProducts from "../components/SimilarProducts.jsx";

const CheckoutProduct = () => {
    const sampleProduct = {
        id: 1,
        name: "حقيبة جلد فاخرة",
        price: 200,
        originalPrice: 250,
        discount: 20,
        rating: 4.8,
        reviewCount: 89,
        description: "حقيبة يد مصنوعة من الجلد الطبيعي بتصميم أنيق ومتين.",
        features: ["جلد طبيعي", "أحزمة قابلة للتعديل", "سحاب معدني قوي"],
        colors: ["بني", "أسود"],
        sizes: ["كبير", "صغير"],
        images: ["/handbag1.png", "/handbag2.png"],
        inStock: true,
        stockQuantity: 10,
    };
    return (
      <div className="bg-white w-screen">
          <Header />
          <ProductDetails  product={sampleProduct} />
          <SimilarProducts />
          <Footer />
      </div>
    );
}

export default CheckoutProduct;