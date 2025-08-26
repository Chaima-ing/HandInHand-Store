import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MainShoppingSection from "../components/MainShoppingSection.jsx";
import ShoppingHero from "../components/ShoppingHero.jsx";
import {useCart}  from '../context/CartContext';
import {useNavigate} from 'react-router-dom';

const ShoppingPage = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const onAddToCart = (product) => {
        addToCart(product, 1); // add with default quantity = 1
    };

    const onDisplayDetails = (product) => {
        navigate(`/checkoutProduct/${product.id}` ,{product: product});
    }

    return (
        <div className="bg-white w-screen">
            <Header />
            <ShoppingHero title="Shop for Gaza"
                          subtitle="Give All You Need"
                          onSearch={(searchTerm) => console.log('Search:', searchTerm)}
            />
            <MainShoppingSection
                onAddToCart={onAddToCart}
                onDisplayDetails={onDisplayDetails}
               /* categories={yourCategories}
                products={yourProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                onCategoryChange={(categoryIndex) => handleCategoryChange(categoryIndex)}
                onAddToCart={(product) => handleAddToCart(product)}
                onBuyNow={(product) => handleBuyNow(product)}
                onPageChange={(page) => setCurrentPage(page)}*/
            />
            <Footer />
        </div>
    );
};

export gidefault ShoppingPage;