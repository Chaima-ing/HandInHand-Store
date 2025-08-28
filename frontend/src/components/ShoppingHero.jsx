import React from 'react';
import { Search } from 'lucide-react';

const ShoppingHero = (
    {
        title = "Shop",
        subtitle = "Give All You Need",
        searchPlaceholder = "Search on Stufflus",
        onSearch = () => {}
        }) => {

    return (
        <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-green-800 mb-4">{title}</h1>
                    <p className="text-xl text-gray-800 mb-8">{subtitle}</p>

                    <div className="relative max-w-md mx-auto">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSearch(e.target.value);
                                }
                            }}
                        />
                        <button
                            onClick={(e) => {
                                const input = e.target.parentElement.querySelector('input');
                                onSearch(input.value);
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShoppingHero;