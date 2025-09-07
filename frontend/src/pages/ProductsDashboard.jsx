import React, {useEffect, useState} from 'react';
import {Package, PlusCircle, Search, Filter, Eye, Edit, Trash2, ChevronLeft, Boxes, CheckCircle, Hourglass, DollarSign} from 'lucide-react';
import SidebarComponent from "../components/SidebarComponent.jsx";
import client from "../apiServices/api.js";

const ProductsDashboard = () => {
    // State management
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([""]);
    const [statsVlue, setStatsValue] = useState({
        totalProducts: 0,
        soldProducts: 0,
        pendingReview: 0,
        totalDonations: 0
    });

    // Stats data
    const stats = [
        {
            value: statsVlue.totalProducts,
            label: "المنتجات الكلية",
            icon: <Boxes className="w-6 h-6" />,
            color: "green"
        },
        {
            value: statsVlue.soldProducts,
            label: "المنتجات المباعة",
            icon: <CheckCircle className="w-6 h-6" />,
            color: "red"
        },
        {
            value: statsVlue.pendingReview,
            label: "في انتظار المراجعة",
            icon: <Hourglass className="w-6 h-6" />,
            color: "yellow"
        },
        {
            value: statsVlue.totalDonations,
            label: "إجمالي التبرعات",
            icon: <DollarSign className="w-6 h-6" />,
            color: "blue"
        }
    ];

    useEffect(getProducts);

    async function getProducts() {
        const userId = localStorage.getItem('userId');

        try {
            const res = await client.get(`/products/getByUser=${userId}`);
            setProducts(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle product deletion
    const handleDeleteProduct = async (id) => {

        if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.')) {
            try{
                const res = await client.delete(`Delete-Product/${id}`);
                setProducts(res.data);
                alert('تم حذف المنتج بنجاح!');
            }catch (e) {
                console.error('Error deleting product:', e);
                alert('حدث خطأ أثناء حذف المنتج.');
            }

        }
    };

    const handleViewProduct = (id) => {

    };

    const handleEditProduct = (id) => {

    };

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            available: {
                text: "متاح",
                class: "bg-green-100 text-green-800"
            },
            sold: {
                text: "مباع",
                class: "bg-red-100 text-red-800"
            },
            pending: {
                text: "في انتظار المراجعة",
                class: "bg-yellow-100 text-yellow-800"
            }
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status]?.class || statusConfig.available.class}`}>
        {statusConfig[status]?.text || statusConfig.available.text}
      </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex" dir="rtl">
            <SidebarComponent />

            {/* Main Content */}
            <main className="flex-1 mr-64 p-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                        قائمة المنتجات
                        <div className="absolute -bottom-3 right-1/2 transform translate-x-1/2 w-24 h-1 bg-green-600 rounded"></div>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
                        إدارة جميع المنتجات التي تم إضافتها إلى متجر غزة للجميع
                    </p>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                                    stat.color === 'red' ? 'bg-red-100 text-red-600' :
                                        stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-blue-100 text-blue-600'
                            }`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-gray-600 text-sm">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <Package className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">جميع المنتجات</h2>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ابحث عن منتج..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>

                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                <span>تصفية</span>
                            </button>

                            <a
                                href="/add-product"
                                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>إضافة منتج</span>
                            </a>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-3 text-right font-semibold text-gray-700">المنتج</th>
                                <th className="px-4 py-3 text-right font-semibold text-gray-700">التصنيف</th>
                                <th className="px-4 py-3 text-right font-semibold text-gray-700">السعر</th>
                                <th className="px-4 py-3 text-right font-semibold text-gray-700">الحالة</th>
                                <th className="px-4 py-3 text-right font-semibold text-gray-700">تاريخ الإضافة</th>
                                <th className="px-4 py-3 text-right font-semibold text-gray-700">الإجراءات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="border-b border-gray-100 hover:bg-green-50 transition-colors">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{product.name}</div>
                                                <div className="text-sm text-gray-600">{product.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-gray-700">{product.category}</td>
                                    <td className="px-4 py-4">
                                        <div className="font-bold text-gray-900">${product.price}</div>
                                        <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full inline-block mt-1">
                                            {product.pricingType === "fixed" ? "سعر ثابت" : "مزايدة"}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <StatusBadge status={product.status} />
                                    </td>
                                    <td className="px-4 py-4 text-gray-700">{product.date}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewProduct(product.id)}
                                                className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                                                title="عرض"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEditProduct(product.id)}
                                                className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                                                title="تعديل"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                                                title="حذف"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mt-8">
                        <button className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                            1
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200">
                            2
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200">
                            3
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductsDashboard;