import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronLeft, ChevronRight, XCircle } from 'lucide-react';
import Sidebar from "./Sidebar.jsx";
import ProductCard from "./Product-Card.jsx";
import axios from "axios";
import {searchProduct, getAllCategories, getProductsByCategory} from "../apiServices/searchServices.js";

const MainShoppingSection = forwardRef(({
                                            onCategoryChange = () => {},
                                            onAddToCart = () => {},
                                            onDisplayDetails = () => {}
                                        }, ref) => {
    const [selectedCategory, setSelectedCategory] = useState(null); // Stores category.id
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);

    useImperativeHandle(ref, () => ({
        handleSearch: async (query) => {
            try {
                const res = await searchProduct(query);
                setResults(res.data);
                setCurrentPage(1);
            } catch (error) {
                setResults([]);
                console.error("Search error:", error);
            }
        },
        clearSearch: () => {
            setResults([]);
            setCurrentPage(1);
        }
    }));

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                console.log("Fetched categories:", JSON.stringify(response.data, null, 2));
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products/get");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError("An error occurred " + (error.message || ""));
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    const activeProducts = results.length > 0 ? results : products;

    const totalPages = Math.ceil(activeProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = activeProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleCategoryChange = async (categoryId) => {
        console.log("Selected category ID:", categoryId);
        setSelectedCategory(categoryId);

        if (categoryId) {
            try {
                const res = await getProductsByCategory(categoryId);
                console.log("Fetched products for category:", res.data);
                setProducts(res.data);
                setResults([]);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching products by category:", error);
                setError("Failed to load products for category");
            }
        } else {
            try {
                const res = await axios.get("http://localhost:8080/products/get");
                setProducts(res.data);
                setResults([]);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching all products:", error);
                setError("Failed to load all products");
            }
        }
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
            for (let i = 1; i <= totalPages; i++) items.push(i);
        } else {
            if (currentPage <= 3) items.push(1, 2, 3, '...', totalPages);
            else if (currentPage >= totalPages - 2) items.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            else items.push(1, '...', currentPage, '...', totalPages);
        }
        return items;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
            <div className="flex gap-5 flex-row">
                {/* Sidebar */}
                <Sidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Main Content */}
                <main className="flex flex-col items-start justify-start w-full ml-30 overflow-y-auto">
                    {/* Show "Clear Search" if results are active */}
                    {results.length > 0 && (
                        <div className="flex justify-between items-center w-full mb-6 px-2">
                            <p className="text-gray-600">
                                Showing {results.length} result{results.length !== 1 ? 's' : ''} for your search
                            </p>
                            <button
                                onClick={() => setResults([])}
                                className="flex items-center text-red-600 hover:text-red-800 transition"
                            >
                                <XCircle className="w-5 h-5 mr-1" />
                                Clear Search
                            </button>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {currentProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={onAddToCart}
                                onDisplayDetails={onDisplayDetails}
                            />
                        ))}
                    </div>

                    {results.length === 0 && (
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
                    )}
                </main>
            </div>
        </div>
    );
});

export default MainShoppingSection;