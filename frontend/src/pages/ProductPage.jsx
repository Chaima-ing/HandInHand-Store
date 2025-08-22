import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProductCard from '../components/ProductCard.jsx';
import GazaSupportProductCard from "../components/GazaSupportProductCard.jsx";

function ProductPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex flex-row">
                    <ProductCard />
                    <GazaSupportProductCard />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProductPage;
