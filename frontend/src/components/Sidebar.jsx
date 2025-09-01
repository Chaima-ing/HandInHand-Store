// components/Sidebar.jsx
import React from "react";

const Sidebar = ({ categories = [], selectedCategory, onCategoryChange }) => {
    return (
        <aside className="w-64 flex-shrink-0 h-[calc(100vh-4rem)] h-fit sticky top-6 self-start shadow">
            <div className="bg-black rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-white mb-4">Category</h3>
                <div className="space-y-4 space-x-6">
                    {categories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    className="mr-3 accent-red-600"
                                    checked={selectedCategory === index}
                                    onChange={() => onCategoryChange(index)}
                                />
                                <span
                                    className={`text-sm ${
                                        selectedCategory === index
                                            ? "font-semibold text-green-700"
                                            : "text-white"
                                    }`}
                                >
                  {category.name}
                </span>
                            </label>
                            {category.count && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
