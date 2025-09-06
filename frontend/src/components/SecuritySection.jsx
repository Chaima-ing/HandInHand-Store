import React, { useState } from 'react';
import {Shield, Check} from 'lucide-react';
import client from "../apiServices/api.js";

const SecuritySection = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSecurity = async () => {
        if (newPassword !== confirmPassword) {
            alert("كلمة المرور الجديدة وتأكيدها غير متطابقين");
            return;
        }

        try {
            const userId = localStorage.getItem('userId');

            const res = await client.patch(`api/users/${userId}/change-password`, {
                currentPassword: oldPassword,      // ✅ matches backend DTO
                newPassword: newPassword,          // ✅ matches backend DTO
                confirmNewPassword: confirmPassword // ✅ must match field name in DTO
            });

            alert(res.data); // "Password updated successfully"
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            alert(err.response?.data || "فشل في تغيير كلمة المرور");
        }
    };




    return(
        <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[620px]">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                    <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">الأمان</h2>
            </div>
            <p className="text-gray-600 mb-8">إدارة إعدادات أمان حسابك وكلمة المرور</p>

            <div className="flex items-center p-4 bg-green-50 rounded-xl mb-8">
                <Check className="w-6 h-6 text-green-600 ml-4" />
                <p className="font-medium text-gray-700">
                    حالة أمان حسابك: <span className="text-green-600 font-bold">جيدة</span> • آخر تحديث: ١٠ نوفمبر ٢٠٢٣
                </p>
            </div>

            <div className="space-y-6 mb-8">
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">كلمة المرور الحالية *</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => {setOldPassword(e.target.value)}}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">كلمة المرور الجديدة *</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => {setNewPassword(e.target.value)}}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">تأكيد كلمة المرور الجديدة *</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <button className="px-8 py-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">
                    إلغاء
                </button>
                <button
                    onClick={() => handleSecurity()}
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                    تغيير كلمة المرور
                </button>
            </div>
        </div>

);
}
export default SecuritySection;