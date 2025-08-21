import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

export function ProductCard() {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta) => {
        setQuantity(Math.max(1, quantity + delta));
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto" dir="rtl">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-3 text-right">
                الشراء المباشر
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 text-right">
                يمكنك شراء هذا المنتج مباشرة بالسعر المحدد. سيتم توجيهك إلى صفحة الدفع
                لإكمال عملية الشراء.
            </p>

            {/* Quantity Section */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-3 text-right">
                    الكمية
                </label>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                        <Minus className="w-4 h-4 text-gray-600" />
                    </button>

                    <div className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-800">{quantity}</span>
                    </div>

                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                        <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Total Price */}
            <div className="mb-6">
                <div className="text-right">
                    <span className="text-sm text-gray-600">السعر الإجمالي</span>
                    <div className="text-3xl font-bold text-green-600 mt-1">
                        ${120 * quantity}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 h-auto text-base rounded-xl transition-colors"
                >
                    🔒 شراء الآن
                </button>

                <button
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 h-auto text-base rounded-xl flex items-center justify-center transition-colors"
                >
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    اضافة الى السلة
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
