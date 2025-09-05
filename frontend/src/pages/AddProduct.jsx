import React, { useEffect, useState, useRef } from "react";
import { Heart, Info, Tag, Image, Box, Upload, X } from "lucide-react";
import SidebarComponent from "../components/SidebarComponent.jsx";
import client from "../apiServices/api.js";

const AddProduct = () => {
    const [donationPercent, setDonationPercent] = useState(100);
    const [images, setImages] = useState([]); // store File objects
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await client.get("/api/categories/get/all");
                setCategories(res.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    // handle selecting images
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    // remove an image
    const removeImage = (index) => {
        if (window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) {
            setImages(images.filter((_, i) => i !== index));
        }
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const productData = {
            sellerId: localStorage.getItem("userId"),
            title: e.target["product-title"].value,
            description: e.target["product-description"].value,
            priceType: "FIXED",
            fixedPrice: parseFloat(e.target["product-price"].value),
            status: "AVAILABLE",
            categories_ids: [parseInt(e.target["product-category"].value)],
            donationPercentage: donationPercent,
        };

        try {
            // 1️⃣ Save product
            const res = await client.post("/Add-Product", productData);
            const productId = res.data.productId;

            // 2️⃣ Upload each image
            for (let file of images) {
                const formData = new FormData();
                formData.append("file", file);

                await client.post(`/products/${productId}/upload-image`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            alert("✅ تم إضافة المنتج مع الصور!");
            e.target.reset();
            setImages([]);
        } catch (err) {
            console.error("Error adding product:", err);
            alert("❌ فشل في إضافة المنتج");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex" dir="rtl">
            <SidebarComponent />

            <main className="flex-1 mr-64 p-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                        إضافة منتج جديد
                        <div className="absolute -bottom-3 right-1/2 transform translate-x-1/2 w-24 h-1 bg-green-600 rounded"></div>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
                        أضف منتجك لدعم أهالي غزة، كل الأرباح ستذهب لمساعدة العائلات
                        المحتاجة في غزة
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-lg p-8 mb-8"
                >
                    {/* Basic info */}
                    <div className="mb-10 pb-8 border-b border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                                <Info className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold">معلومات المنتج الأساسية</h2>
                        </div>

                        <div className="grid md:grid-cols-1 gap-6">
                            <div>
                                <label
                                    htmlFor="product-title"
                                    className="block text-gray-700 font-semibold mb-3"
                                >
                                    عنوان المنتج *
                                </label>
                                <input
                                    type="text"
                                    id="product-title"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                                    placeholder="أدخل عنوان واضح للمنتج"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="product-category"
                                    className="block text-gray-700 font-semibold mb-3"
                                >
                                    التصنيف *
                                </label>
                                <select
                                    id="product-category"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                                    required
                                >
                                    <option value="">اختر تصنيف المنتج</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="product-description"
                                    className="block text-gray-700 font-semibold mb-3"
                                >
                                    وصف المنتج *
                                </label>
                                <textarea
                                    id="product-description"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                                    placeholder="صف منتجك بشكل مفصل، اذكر المواصفات والمميزات"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-10 pb-8 border-b border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                                <Tag className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold">تحديد السعر</h2>
                        </div>

                        <div className="grid md:grid-cols-1 gap-6">
                            <div>
                                <label
                                    htmlFor="product-price"
                                    className="block text-gray-700 font-semibold mb-3"
                                >
                                    السعر الثابت *
                                </label>
                                <input
                                    type="number"
                                    id="product-price"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                                    placeholder="السعر بالدولار"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="mb-10 pb-8 border-b border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                                <Image className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold">صور المنتج</h2>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-3">
                                أضف صوراً واضحة للمنتج (3 صور على الأقل)
                            </label>
                            <div className="flex flex-wrap gap-4">
                                <div
                                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-green-500"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500 text-center">
                                        اضغط لرفع صورة
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />

                                {images.map((file, index) => (
                                    <div
                                        key={index}
                                        className="w-32 h-32 rounded-xl overflow-hidden relative"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`preview-${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-2 left-2 w-6 h-6 bg-red-500 text-white rounded-full"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quantity + Condition */}
                    <div className="mb-10 pb-8 border-b border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                                <Box className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold">المخزون والتوفر</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="product-quantity"
                                    className="block text-gray-700 font-semibold mb-3"
                                >
                                    الكمية المتاحة *
                                </label>
                                <input
                                    type="number"
                                    id="product-quantity"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                                    placeholder="عدد القطع المتاحة"
                                    min="1"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="product-condition"
                                    className="block text-gray-700 font-semibold mb-3"
                                >
                                    حالة المنتج *
                                </label>
                                <select
                                    id="product-condition"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                                    required
                                >
                                    <option value="">اختر حالة المنتج</option>
                                    <option value="new">جديد</option>
                                    <option value="used">مستعمل - بحالة ممتازة</option>
                                    <option value="good">مستعمل - بحالة جيدة</option>
                                    <option value="fair">مستعمل - بحالة مقبولة</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Donation */}
                    <div className="mb-10">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                                <Heart className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold">التبرع لدعم غزة</h2>
                        </div>

                        <div>
                            <label
                                htmlFor="donation-percent"
                                className="block text-gray-700 font-semibold mb-3"
                            >
                                نسبة التبرع من الربح *
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    id="donation-percent"
                                    min="0"
                                    max="100"
                                    value={donationPercent}
                                    onChange={(e) => setDonationPercent(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-xl font-bold text-green-600 min-w-[3rem]">
                  {donationPercent}%
                </span>
                            </div>
                            <p className="mt-4 text-green-600 font-semibold flex items-center gap-2">
                                <Info className="w-5 h-5" />
                                تبرعك بنسبة {donationPercent}% يعني أن{" "}
                                {donationPercent === 100
                                    ? "كل الأرباح ستذهب لدعم أهالي غزة"
                                    : `${donationPercent}% من الأرباح ستذهب لدعم أهالي غزة`}
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            type="button"
                            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    جاري إضافة المنتج...
                                </>
                            ) : (
                                "إضافة المنتج"
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddProduct;
