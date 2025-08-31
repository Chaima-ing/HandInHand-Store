import { useCart } from '../context/CartContext.jsx'; // Named import, not default
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutForm() { // Component name should be PascalCase
    const {
        cartItems,
        getCartTotal,
        getCartItemsCount,
        validateCart
    } = useCart();

    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        const validation = validateCart();
        if (!validation.isValid) { // Property is 'isValid', not 'isValidated'
            alert('Cart validation failed: ' + validation.message);
            navigate("/shoppingCart"); // Fixed typo and make sure this matches your route
        }
    }, [navigate, validateCart]); // Add dependencies

    const handleSubmitOrder = (e) => {
        e.preventDefault();

        // Final validation before submitting
        const finalValidation = validateCart();
        if (!finalValidation.isValid) {
            alert('Cart validation failed: ' + finalValidation.message);
            return;
        }

        // Process the order
        console.log('Processing order...');
        console.log('Cart items:', cartItems);
        console.log('Total:', finalValidation.cartTotal);

        // Here you would typically make an API call to create the order
        // Example: submitOrder(cartItems, finalValidation.cartTotal);

        // For now, show success message
        alert(`Order submitted successfully! Total: $${finalValidation.cartTotal.toFixed(2)}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-6">Checkout</h1>
            <div className="flex flex-row justify-center items-start gap-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 w-[500px] w-[250px]-md w-[90px]-sm">
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
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border rounded-lg px-3 py-2"
                            required
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
                        <select name="paymentMethod" className="border">
                            <option value="">Delivery Method</option>
                            <option value="">At home</option>
                            <option value="">Delivery Agency</option>
                        </select>
                        <div>
                            <h2 className="text-[20px]">Payment Method</h2>
                            <div className="flex flex-row gap-12">
                                <label>
                                    <img src="/check.png" className="m-5" />
                                    <input type="radio" value="Baridi-Mob"/>
                                    <span>Baridi-Mob</span>
                                </label>
                                <label>
                                    <img src="/check.png" className="m-5"/>
                                    <input type="radio" value="Edahabiya"/>
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