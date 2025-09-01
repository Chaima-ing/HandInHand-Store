import { useCart } from '../context/CartContext.jsx'; // Named import, not default
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
    const {
        cartItems,
        getCartTotal,
        getCartItemsCount,
        validateCart
    } = useCart();

    const navigate = useNavigate();
    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        const form = e.target;
        const firstName = form.firstName.value.trim();
        const lastName = form.lastName.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const paymentMethod = form.paymentMethod.value;
        const deliveryMethod = form.deliveryMethod.value;

        if (!/^[A-Za-z\s]+$/.test(firstName)) {
            alert("First name must contain only letters");
            return;
        }
        if (!/^[A-Za-z\s]+$/.test(lastName)) {
            alert("Last name must contain only letters");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Invalid email format");
            return;
        }
        if (!/^\+?[0-9]{7,15}$/.test(phone)) {
            alert("Invalid phone number");
            return;
        }
        if (!paymentMethod) {
            alert("Please select a payment method");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/create-invoice", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    deliveryMethod,
                    paymentMethod,
                    total: getCartTotal(),
                }),
            });

            const data = await response.json();

            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                alert("Error creating payment. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Payment request failed");
        }
    };


    useEffect(() => {
        const validation = validateCart();
        if (!validation.isValid) {
            alert('Cart validation failed: ' + validation.message);
            navigate("/shoppingCart");
        }
    }, [navigate, validateCart]);


    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-6">Checkout</h1>
            <div className="flex flex-row justify-center items-start gap-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 w-[500px] w-[250px]-md w-[90px]-sm h-fit sticky top-6 self-start shadow">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between">
                            <span>{item.title} (x{item.quantity})</span>
                            <span>${(item.fixedPrice * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="border-t pt-2 font-semibold">
                        <div className="flex justify-between">
                            <span>Total ({getCartItemsCount()} items):</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-6 w-[600px] h-full">
                {/* Customer Information */}
                <div className="bg-white rounded-lg p-6 shadow h-full">
                    <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="border rounded-lg px-3 py-2"
                            required
                            name="firstName"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border rounded-lg px-3 py-2"
                            required
                            name="lastName"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border rounded-lg px-3 py-2 md:col-span-2"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="border rounded-lg px-3 py-2 md:col-span-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Adress"
                            className="border rounded-lg px-3 py-2 md:col-span-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="City"
                            className="border rounded-lg px-3 py-2 md:col-span-2"
                            required
                        />
                        <h2 className="text-[20px]">Delivery</h2>
                        <select name="deliveryMethod" className="border">
                            <option value="" name="deliveryMethod">Delivery Method</option>
                            <option value="" name="deliveryMethod">At home</option>
                            <option value="" name="deliveryMethod">Delivery Agency</option>
                        </select>
                        <div>
                            <h2 className="text-[20px]">Payment Method</h2>
                            <div className="flex flex-row gap-12">
                                <label>
                                    <img src="/baridimob.jpeg" className="m-5" />
                                    <input type="radio" value="Baridi-Mob" name="paymentMethod" className="mr-3 accent-red-600"/>
                                    <span>Baridi-Mob</span>
                                </label>
                                <label>
                                    <img src="/cart%20d'or.jpeg" className="m-5"/>
                                    <input type="radio" value="Edahabiya" name="paymentMethod" className="mr-3 accent-red-600"/>
                                    <span>Edahabiya</span>
                                </label>
                            </div>

                        </div>
                        <input
                            type="text"
                            placeholder="Credit Card Number"
                            className="border rounded-lg px-3 py-2 md:col-span-2"
                            required

                        />
                        <label className="text-[15px]">Credit Card Expiration date</label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className="border rounded-lg px-3 py-2"
                            required
                        />
                        <label className="text-[15px]">Credit Card CCV</label>
                        <input
                            type="text"
                            placeholder="CVV"
                            className="border rounded-lg px-3 py-2"
                            required
                        />

                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                    Place Order - ${getCartTotal().toFixed(2)}
                </button>
            </form>
            </div>
        </div>
    );
}

export default CheckoutForm;