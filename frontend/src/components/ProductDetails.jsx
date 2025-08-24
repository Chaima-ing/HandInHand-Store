// components/ProductDetails.jsx
import React, { useState } from "react";
import { Plus, Minus, ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductDetails = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) return null; // safeguard

  // Quantity handler
  const handleQuantityChange = (change) => {
    const newQuantity = selectedQuantity + change;
    if (newQuantity >= 1 && newQuantity <= (product.stockQuantity || 99)) {
      setSelectedQuantity(newQuantity);
    }
  };

  // Add to Cart handler
  const handleAddToCart = () => {
    // validate only if product has options
    if (product.colors?.length && !selectedColor) {
      alert("يرجى اختيار اللون");
      return;
    }
    if (product.sizes?.length && !selectedSize) {
      alert("يرجى اختيار المقاس");
      return;
    }

    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      subtitle: `${selectedColor || ""} ${selectedSize || ""}`.trim(),
    };

    addToCart(productToAdd, selectedQuantity);
    alert(`تم إضافة ${selectedQuantity} من ${product.name} إلى السلة`);
  };

  const currentCartQuantity = getItemQuantity(product.id);
  const isProductInCart = isInCart(product.id);

  return (
      <div
          className="w-screen mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-6"
          dir="rtl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex flex-col items-center justify-center">
              <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-max-2xl h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(1).map((image, index) => (
                      <div
                          key={index}
                          className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                      >
                        <img
                            src={image}
                            alt={`${product.name} ${index + 2}`}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-75"
                        />
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {product.name}
              </h1>
              {product.subtitle && (
                  <p className="text-gray-600 text-sm">{product.subtitle}</p>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={20}
                            className={
                              i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                            }
                        />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                ({product.reviewCount || 0} تقييم)
              </span>
                </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-green-600">
              ${product.price}
            </span>
              {product.originalPrice && (
                  <>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
                    {product.discount && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
                    -{product.discount}%
                  </span>
                    )}
                  </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                  className={`w-3 h-3 rounded-full ${
                      product.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
              ></div>
              <span
                  className={
                    product.inStock ? "text-green-600" : "text-red-600"
                  }
              >
              {product.inStock
                  ? `متوفر (${product.stockQuantity || 0} قطعة)`
                  : "غير متوفر"}
            </span>
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">اللون</h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 border rounded-lg transition-colors ${
                                selectedColor === color
                                    ? "border-green-500 bg-green-50 text-green-700"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                          {color}
                        </button>
                    ))}
                  </div>
                </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">المقاس</h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 border rounded-lg transition-colors ${
                                selectedSize === size
                                    ? "border-green-500 bg-green-50 text-green-700"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                          {size}
                        </button>
                    ))}
                  </div>
                </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-2">الكمية</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={selectedQuantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                  {selectedQuantity}
                </span>
                  <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={
                          selectedQuantity >= (product.stockQuantity || 99)
                      }
                      className="p-2 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {isProductInCart && (
                    <span className="text-sm text-gray-600">
                  (في السلة: {currentCartQuantity})
                </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart size={20} />
                {isProductInCart
                    ? "إضافة المزيد إلى السلة"
                    : "إضافة إلى السلة"}
              </button>

              <div className="flex gap-3">
                <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                  <Heart size={20} />
                  إضافة للمفضلة
                </button>
                <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                  <Share2 size={20} />
                  مشاركة
                </button>
              </div>
            </div>

            {/* Description */}
            {product.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">وصف المنتج</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {product.description}
                  </p>
                  {product.features?.length > 0 && (
                      <>
                        <h4 className="font-semibold mb-2">المميزات:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {product.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </>
                  )}
                </div>
            )}

            {/* Donation Section */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <h3 className="text-green-700 font-bold">% من الربح</h3>
              <p className="text-gray-700 text-sm">
                كل الأرباح من بيع هذا المنتج ستذهب لدعم أهالي غزة.
              </p>
              <p className="text-gray-700 text-sm">
                تبرعك سيصل مباشرة إلى العائلات المحتاجة في قطاع غزة.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <h3 className="text-red-700 font-bold">تبرعك يدعم غزة ❤️</h3>
              <p className="text-gray-700 text-sm">
                كل عملية شراء أو مزايدة تساهم في دعم العائلات المحتاجة في قطاع غزة.
              </p>
              <p className="text-gray-600 text-xs mt-2">
                نحن مع غزة. دعمك يصنع الفرق 🌿
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductDetails;
