import React, { useState } from 'react';
import { Search } from 'lucide-react';
import axios from "axios";

const ShoppingHero = ({
                          title = "Shop",
                          subtitle = "Give All You Need",
                          searchPlaceholder = "Search on Stufflus",
                      }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        try {
            const res = await axios.get(`http://localhost:8080/products/search?keyword=${query}`);
            setResults(res.data);
            console.log("Search results:", res.data); // ✅ see what comes back
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <section className="relative py-20 bg-center bg-cover"
                 /*style={{ backgroundImage: "url('/solidarity.jpg')" }}*/>
            {/* Overlay to make text readable */}
            <div className="absolute inset-0 bg-gray-200 bg-opacity-40"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-green-800 mb-4">{title}</h1>
                    <p className="text-xl text-gray-800 mb-8">{subtitle}</p>

                    <form
                        onSubmit={handleSearch}
                        className="relative max-w-md mx-auto flex items-center"
                    >
                        <Search className="w-5 h-5 absolute left-4 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
                        >
                            Search
                        </button>
                    </form>

                    {/* Example: Show results */}
                    <div className="mt-6">
                        {results.length > 0 ? (
                            <ul className="space-y-2">
                                {results.map((p) => (
                                    <li key={p.id} className="text-gray-700">
                                        {p.title} – ${p.fixedPrice ?? "N/A"}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-red-500">No results yet...</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShoppingHero;
