import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx";
import ShopingCart from "../components/ShopingCart.jsx";

const CartPage = () => {
    return(
        <div className="bg-white">
            <Header />
            <ShoppingCart />
            <Footer />
        </div>
    );
}

export default CartPage;