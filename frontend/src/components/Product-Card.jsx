import React from "react";

const ProductCard = ({ product, onBuyNow, onAddToCart }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="relative mb-4">
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-24 h-24 bg-gray-300 rounded"></div>
                )}
            </div>
            <span className="absolute top-2 right-2 bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">
          {product.category}
        </span>
        </div>

        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        <span className="text-xl font-bold text-gray-800">${product.price}</span>
        {/*
            <div className="flex items-center mb-3">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
          {product.rating} ({product.reviews} Reviews)
        </span>
            </div>*/}

        <div className="flex items-center justify-between">
            <div className="flex gap-2">
                <button
                    onClick={() => onAddToCart(product)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                    Add to Cart
                </button>
                <button
                    onClick={() => onBuyNow(product)}
                    className="px-4 py-1 text-sm bg-black text-white rounded-full hover:bg-green-700 transition-colors"
                >
                    Display Details
                </button>
            </div>
        </div>
    </div>
);

export default ProductCard