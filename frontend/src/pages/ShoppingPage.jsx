import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MainShoppingSection from "../components/MainShoppingSection.jsx";
import ShoppingHero from "../components/ShoppingHero.jsx";

const ShoppingPage = () => {
    return (
        <div className="bg-white w-screen">
            <Header />
            <ShoppingHero title="Shop for Gaza"
                          subtitle="Give All You Need"
                          onSearch={(searchTerm) => console.log('Search:', searchTerm)}
            />
            <MainShoppingSection
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

export default ShoppingPage;