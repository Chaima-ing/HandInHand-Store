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
            images: []
        }
    );

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


    useEffect(() => {
        if (state?.product) {
            setFormValues(state.product);
        } else {
            // fallback: fetch from backend
            const fetchProduct = async () => {
                try {
                    const res = await client.get(`/api/products/${productId}`);
                    setFormValues(res.data);
                } catch (err) {
                    console.error("❌ Failed to fetch product", err);
                }
            };
            fetchProduct();
        }
    }, [productId, state?.product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const userId = localStorage.getItem("userId");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formValues,
                seller: { id: userId }
            };

            await client.put(`/Update-Product/${productId}`, payload, {
                headers: { "Content-Type": "application/json" },
            });

            alert("✅ Product updated successfully!");
            navigate("/ProductsDashboard");
        } catch (err) {
            console.error("❌ Error updating product:", err);
            alert("حدث خطأ أثناء تعديل المنتج");
        }
    };


    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10" dir="rtl">
            <h1 className="text-2xl font-bold mb-6 text-green-700">تعديل المنتج</h1>

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
                    />
                </div>

                {/* Categories */}
                <div>
                    <label className="block font-medium mb-1">التصنيف</label>
                    <select
                        name="categories"
                        value={formValues.categories[0]?.id || ""}
                        onChange={(e) =>
                            setFormValues((prev) => ({
                                ...prev,
                                categories: [{ id: parseInt(e.target.value, 10) }]
                            }))
                        }
                    >
                        <option value="">اختر تصنيف المنتج</option>
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
                    >
                        <option value="AVAILABLE">متاح</option>
                        <option value="PENDING">في انتظار المراجعة</option>
                        <option value="SOLD">مباع</option>
                    </select>

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
