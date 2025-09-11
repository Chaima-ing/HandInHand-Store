import React from "react";
import { Edit } from "lucide-react";

const DisplayProductDetails = ({ product }) => {
    if (!product) return null; // safeguard

    return (
        <div
            className="w-screen mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-8"
            dir="rtl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex justify-center">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={product.images?.[0]?.imageUrl}
                            alt={product.title}
                            className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-bold text-green-700">{product.title}</h1>
                        <p className="text-gray-500 text-sm mt-1">اسم المنتج</p>
                    </div>

                    {/* Price */}
                    <div>
                        <h2 className="text-2xl font-bold text-green-700">
                            ${product.fixedPrice}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">السعر</p>
                    </div>

                    {/* Extra Seller Info */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">الحالة:</span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    product.status === "available"
                                        ? "bg-green-100 text-green-800"
                                        : product.status === "sold"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                {product.status === "available"
                    ? "متاح"
                    : product.status === "sold"
                        ? "مباع"
                        : "في انتظار المراجعة"}
              </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">التصنيف:</span>
                            <span className="text-gray-600">
                {Array.isArray(product.categories)
                    ? product.categories.map((c) => c.name).join(", ")
                    : product.categories?.name || product.categories || "غير محدد"}
              </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">تاريخ الإضافة:</span>
                            <span className="text-gray-600">
                {new Date(product.createdAt).toLocaleDateString("ar-EG")}
              </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <Edit size={20} />
                            تعديل المنتج
                        </button>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">وصف المنتج</h3>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>
                    )}

                    {/* Donation Section */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                        <h3 className="text-green-700 font-bold">تبرعات من الأرباح</h3>
                        <p className="text-gray-700 text-sm">
                            كل الأرباح من بيع هذا المنتج ستذهب لدعم أهالي غزة.
                        </p>
                        <p className="text-gray-700 text-sm">
                            تبرعك سيصل مباشرة إلى العائلات المحتاجة في قطاع غزة.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayProductDetails;
