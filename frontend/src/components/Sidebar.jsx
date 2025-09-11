// components/Sidebar.jsx
import React from "react";

const Sidebar = ({ categories = [], selectedCategory, onCategoryChange }) => {
    return (
        <aside className="w-64 flex-shrink-0 h-[calc(100vh-4rem)] h-fit sticky top-6 self-start shadow">
            <div className="bg-black rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-white mb-4">Category</h3>
                <div className="space-y-4 space-x-6">
                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                className="mr-3 accent-red-600"
                                checked={selectedCategory === null}
                                onChange={() => onCategoryChange(null)}
                            />
                            <span>🌐</span>
                            <span
                                className={`text-sm ${
                                    selectedCategory === null
                                        ? "font-semibold text-green-700"
                                        : "text-white"
                                }`}
                            >
                                All Categories
                            </span>
                        </label>
                    </div>
                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    className="mr-3 accent-red-600"
                                    checked={selectedCategory === category.id}
                                    onChange={() => onCategoryChange(category.id)}
                                />
                                <span>{category.icon}</span>
                                <span
                                    className={`text-sm ${
                                        selectedCategory === category.id
                                            ? "font-semibold text-green-700"
                                            : "text-white"
                                    }`}
                                >
                                    {category.name}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
