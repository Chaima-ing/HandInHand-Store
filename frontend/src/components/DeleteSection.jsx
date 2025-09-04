import React, { useState} from 'react';
import {Trash2} from 'lucide-react';
import { deleteUser } from "../apiServices/authService.js"
import { useNavigate } from "react-router-dom";

const DeleteSection = ({ isLoading, setIsLoading, setUser }) => {

    const [deleteValue, setDeleteValue] = useState("");
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        if (deleteValue === "حذف حسابي") {
            if (confirm("هل أنت متأكد تماماً من رغبتك في حذف حسابك بشكل دائم؟ لا يمكن التراجع عن هذا الإجراء.")) {
                setIsLoading(true);
                try {
                    const userId = localStorage.getItem('userId');
                    await deleteUser(userId);

                    localStorage.deleteItem("userId");
                    localStorage.deleteItem("userEmail");
                    setUser(null);
                    alert("تم حذف حسابك بنجاح. نأسف لرحيلك ونشكرك على دعمك لأهالي غزة.");
                    navigate("/");
                }catch(error) {
                    console.error("Delete account failed:", error);
                    alert("فشل حذف الحساب، حاول مرة أخرى.");
                } finally {
                    setIsLoading(false);
                }
            }
        }else{
            alert('الرجاء كتابة "حذف حسابي" بشكل صحيح للتأكيد.');
        }
    };

    return(
        <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[620px]">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center ml-4">
                    <Trash2 className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">حذف الحساب</h2>
            </div>
            <p className="text-gray-600 mb-8">حذف حسابك بشكل دائم من المنصة</p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <h3 className="flex items-center gap-2 text-red-600 font-bold text-lg mb-4">

                    تحذير: هذا الإجراء نهائي ولا يمكن التراجع عنه
                </h3>
                <p className="text-gray-700 mb-4">عند حذف حسابك:</p>
                <ul className="text-gray-700 space-y-2 mb-6 pr-4">
                    <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        سيتم إزالة جميع بياناتك الشخصية بشكل دائم
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        ستتوقف جميع المنتجات النشطة في متجرك
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        سيتم إلغاء جميع الطلبات غير المكتملة
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        لن تتمكن من الوصول إلى سجل تبرعاتك
                    </li>
                </ul>
                <p className="text-gray-700">نوصي بتصدير بياناتك قبل المتابعة في حذف الحساب.</p>
            </div>

            <div className="mb-6">

                <label className="block text-gray-700 font-semibold mb-3">اكتب "حذف حسابي" للتأكيد *</label>
                <input
                    type="text"
                    value={deleteValue}
                    onChange={(e) => setDeleteValue(e.target.value)}
                    placeholder="حذف حسابي"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-3 focus:ring-red-100"
                />
            </div>

            <div className="flex justify-start">
                <button
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all disabled:opacity-50"
                >
                    حذف حسابي بشكل دائم
                </button>
            </div>
        </div>
    );
}
export default DeleteSection;