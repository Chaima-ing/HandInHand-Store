import Header from "../components/Header.jsx";
import ShoppingCart from "../components/ShoppingCart.jsx";

const CartPage = () => {
    return(
        <div className="bg-white w-screen flex flex-col min-h-screen">

            <Header />
            <div className="bg-gray-100 flex-1">
                <h1 className="text-center text-4xl font-extrabold tracking-wide m-3">Shopping Cart</h1>
                <ShoppingCart />
            </div>
        </div>
    );
}

export default CartPage;