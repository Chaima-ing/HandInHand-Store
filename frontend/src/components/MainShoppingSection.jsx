import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from "./Sidebar.jsx";
import ProductCard from "./Product-Card.jsx"
import axios from "axios";

const MainShoppingSection = ({
                                 categories = [],
                                 products = [],
                                 onCategoryChange = () => {},
                                 onAddToCart = () => {},
                                 onDisplayDetails = () => {}
                             }) => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;
    //const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Default categories if none provided
    const defaultCategories = [
        { name: 'All Products', count: 5, active: true },
        { name: 'For Home', count: null },
        { name: 'For Music', count: null },
        { name: 'For Phone', count: null },
        { name: 'For Storage', count: null },
        { name: 'New Arrival', count: null },
        { name: 'Best Seller', count: null },
        { name: 'On Discount', count: null }
    ];

    // Default products if none provided
    const defaultProducts = [
        { id: 1, name: 'Phone Holder Sakti', price: 29.90, category: 'Other', image: '/api/placeholder/200/200' },
        { id: 2, name: 'Headsound', price: 32.00, category: 'Music', image: '/api/placeholder/200/200' },
        { id: 3, name: 'Adudu Cleaner', price: 29.90, category: 'Other', image: '/api/placeholder/200/200' },
        { id: 4, name: 'CCTV Maling', price: 50.00, category: 'Home', image: '/api/placeholder/200/200' },
        { id: 5, name: 'Stufflus Peker 32', price: 9.90, category: 'Other', image: '/api/placeholder/200/200' },
        { id: 6, name: 'Stufflus RT75', price: 34.10, category: 'Music', image: '/api/placeholder/200/200' },
        { id: 7, name: 'Phone Holder Sakti', price: 29.90, category: 'Other', image: '/api/placeholder/200/200' },
        { id: 8, name: 'Headsound', price: 32.00, category: 'Music', image: '/api/placeholder/200/200' },
        { id: 9, name: 'Adudu Cleaner', price: 29.90, category: 'Other', image: '/api/placeholder/200/200' },
        { id: 10, name: 'CCTV Maling', price: 50.00, category: 'Home', image: '/api/placeholder/200/200' },
        { id: 11, name: 'Stufflus Peker 32', price: 9.90, category: 'Other', image: '/api/placeholder/200/200' },
        { id: 12, name: 'Stufflus RT75', price: 34.10, category: 'Music', image: '/api/placeholder/200/200' }
    ];

    const displayCategories = categories.length > 0 ? categories : defaultCategories;
    const displayProducts = products.length > 0 ? products : defaultProducts;



/*
    useEffect(() => {
        const fetchProducts = async () => {
           axios.get("http://localhost:8080/products/getById")
               .then((response) => {
                   setProducts(response.data);
                   setLoading(false);
               })
               .catch((error)=>{
                   setError("an error occured")+(error.message ? error.message : "");
                   setLoading(false);
               });
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
*/
    // Pagination logic
    const totalPages = Math.ceil(displayProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = displayProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleCategoryChange = (categoryIndex) => {
        setSelectedCategory(categoryIndex);
        onCategoryChange(categoryIndex);
        setCurrentPage(1); // reset to first page when category changes
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const generatePaginationItems = () => {
        const items = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(i);
            }
        } else {
            if (currentPage <= 3) {
                items.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                items.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                items.push(1, '...', currentPage, '...', totalPages);
            }
        }

        return items;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
            <div className="flex gap-5 flex-row">
                {/* Sidebar */}
                <Sidebar
                    categories={displayCategories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Main Content */}
                <main className="flex flex-col items-center justify-center w-full ml-30 overflow-y-auto">
                    {/* Product Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onDisplayDetails={onDisplayDetails} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed mr-3"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                        </button>

                        <div className="flex items-center space-x-2 gap-2">
                            {generatePaginationItems().map((page, index) => (
                                <button
                                    key={index}
                                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                                    disabled={page === '...'}
                                    className={`px-3 py-2 text-sm rounded ${
                                        page === currentPage
                                            ? 'bg-green-700 text-white'
                                            : page === '...'
                                                ? 'text-gray-400 cursor-default'
                                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    {/* Newsletter Section */}
                    <section className="bg-gray-800 rounded-lg p-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-2">Ready to Get</h2>
                        <h3 className="text-3xl font-bold text-white mb-4">Our New Stuff?</h3>
                        <p className="text-gray-300 mb-6 max-w-md mx-auto">
                            Get the best product deals, find best products, and then
                            create a shopping cart! Easy category selections right for you.
                        </p>
                        <div className="flex max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="flex-1 px-4 py-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 transition-colors">
                                Send
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default MainShoppingSection;
