import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import client from "../apiServices/api.js";

const UpdateProduct = () => {
    const { state } = useLocation();
    const { productId } = useParams();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(
        state?.product || {
            title: "",
            description: "",
            priceType: "FIXED",
            fixedPrice: 0,
            status: "AVAILABLE",
            donationPercentage: 0,
            categories: [],
        }
    );

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await client.get("/api/categories/get/all");
                setCategories(res.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories");
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (state?.product) {
            setFormValues({
                ...state.product,
                categories: state.product.categories || [],
                donationPercentage: state.product.donationPercentage || 0,
            });
        } else {
            const fetchProduct = async () => {
                try {
                    const res = await client.get(`/api/products/getById?id=${productId}`);
                    setFormValues({
                        ...res.data,
                        categories: res.data.categories || [],
                        donationPercentage: res.data.donationPercentage || 0,
                    });
                } catch (err) {
                    console.error("❌ Failed to fetch product", err)
                }
            };
            fetchProduct();
        }
    }, [productId, state?.product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!formValues.title) {
            setError("Product title is required");
            return;
        }
        if (!formValues.status) {
            setError("Product status is required");
            return;
        }
        if (!formValues.categories.length) {
            setError("At least one category is required");
            return;
        }

        try {
            const payload = {
                title: formValues.title,
                description: formValues.description,
                priceType: formValues.priceType,
                fixedPrice: formValues.priceType === "FIXED" ? parseFloat(formValues.fixedPrice) : null,
                status: formValues.status,
                donationPercentage: parseFloat(formValues.donationPercentage) || 0,
                categoriesIds: formValues.categories.map((cat) => cat.id),
            };

            console.log("Payload:", JSON.stringify(payload, null, 2));

            await client.put(`/Update-Product/${productId}`, payload, {
                headers: { "Content-Type": "application/json" },
            });

            alert("✅ Product updated successfully!");
            navigate("/ProductsDashboard");
        } catch (err) {
            console.error("❌ Error updating product:", err);
            const errorMessage = err.response?.data?.error || "حدث خطأ أثناء تعديل المنتج";
            setError(errorMessage);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10" dir="rtl">
            <h1 className="text-2xl font-bold mb-6 text-green-700">تعديل المنتج</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">اسم المنتج</label>
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block font-medium mb-1">السعر</label>
                    <input
                        type="number"
                        name="fixedPrice"
                        value={formValues.fixedPrice}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Price Type */}
                <div>
                    <label className="block font-medium mb-1">نوع السعر</label>
                    <select
                        name="priceType"
                        value={formValues.priceType}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                        <option value="FIXED">ثابت</option>
                        <option value="AUCTION">مزاد</option>
                    </select>
                </div>

                {/* Categories */}
                <div>
                    <label className="block font-medium mb-1">التصنيف</label>
                    <select
                        name="categories"
                        multiple
                        value={formValues.categories.map((cat) => cat.id)}
                        onChange={(e) =>
                            setFormValues((prev) => ({
                                ...prev,
                                categories: Array.from(e.target.selectedOptions).map((option) => ({
                                    id: parseInt(option.value, 10),
                                })),
                            }))
                        }
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    >
                        <option value="" disabled>
                            اختر تصنيف المنتج
                        </option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block font-medium mb-1">الحالة</label>
                    <select
                        name="status"
                        value={formValues.status}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    >
                        <option value="AVAILABLE">متاح</option>
                        <option value="PENDING">في انتظار المراجعة</option>
                        <option value="SOLD">مباع</option>
                    </select>
                </div>

                {/* Donation Percentage */}
                <div>
                    <label className="block font-medium mb-1">نسبة التبرع</label>
                    <input
                        type="number"
                        name="donationPercentage"
                        value={formValues.donationPercentage}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        min="0"
                        max="100"
                        step="0.01"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">الوصف</label>
                    <textarea
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                    حفظ التعديلات
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;