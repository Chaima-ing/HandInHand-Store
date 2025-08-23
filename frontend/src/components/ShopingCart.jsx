import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import useCart  from '../context/CartContext';

const ShoppingCart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

    const getItemTotal = (price, quantity) => price * quantity;

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6" dir="rtl">
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                {item.id === 1 && (
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                                    </div>
                                )}
                                {item.id === 2 && (
                                    <div className="w-full h-full bg-yellow-400 flex items-center justify-center">
                                        <div className="w-12 h-8 bg-gray-800 rounded-full relative">
                                            <div className="absolute inset-1 bg-gray-900 rounded-full"></div>
                                        </div>
                                    </div>
                                )}
                                {item.id === 3 && (
                                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                                        <div className="w-10 h-6 bg-gray-700 rounded"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                            <h3 className="font-medium text-gray-900 text-right">{item.name}</h3>
                            <p className="text-sm text-gray-500 text-right">{item.subtitle}</p>
                        </div>

                        {/* Price Display */}
                        <div className="text-center min-w-[80px]">
                            <div className="text-lg font-semibold text-green-600">
                                ${getItemTotal(item.price, item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">
                                ${item.price}
                            </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                            >
                                <Plus size={16} />
                            </button>

                            <span className="w-8 text-center font-medium">{item.quantity}</span>

                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                                disabled={item.quantity <= 1}
                            >
                                <Minus size={16} />
                            </button>
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Total Section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-900">
                        ${getCartTotal()}
                    </div>
                    <div className="text-xl font-semibold text-gray-700">
                        المجموع
                    </div>
                </div>
            </div>

            {/* Empty Cart Message */}
            {cartItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-lg">السلة فارغة</p>
                    <p className="text-sm">أضف بعض المنتجات للمتابعة</p>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;