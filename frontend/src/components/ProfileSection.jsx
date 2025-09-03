import React, { useState} from 'react';
import {User,Trash2,Upload} from 'lucide-react';
import client from "../apiServices/api.js";

const ProfileSection = () => {
    const [fullName, setFullName] = useState("محمد أحمد");
    const [email, setEmail] = useState("mohamed@example.com");
    const [phone, setPhone] = useState("+970 59 123 4567");
    const [address, setAddress] = useState("غزة، فلسطين");
    const [bio, setBio] = useState("أنا بائع في متجر غزة للجميع...");
    const [isLoading, setIsLoading] = useState(false);



    const handleSave = async () => {
        setIsLoading(true);
        try{
            const userId = localStorage.getItem('userId');
            const response = await client.put(`/users/${userId}`, {
                fullName,
                email,
                phoneNumber : phone,
                address,
                bio
            });
            setFullName(response.data.fullName);
            setEmail(response.data.email);
            setPhone(response.data.phoneNumber);
            setAddress(response.data.address);
            setBio(response.data.bio);
            alert("تم حفظ التغييرات بنجاح!");
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("فشل حفظ التغييرات!");
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[620px]">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                    <User className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">الملف الشخصي</h2>
            </div>
            <p className="text-gray-600 mb-8">إدارة معلومات حسابك الشخصية وصورة الملف الشخصي</p>

            <div className="flex items-center gap-8 mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-600">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="صورة المستخدم"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 border-2 border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                        <Upload className="w-4 h-4" />
                        تغيير الصورة
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                        إزالة الصورة
                    </button>
                    <p className="text-sm text-gray-500 mt-3">يجب أن تكون الصورة بحجم أقل من 2MB</p>
                </div>
            </div>
            <form onSubmit={(e) => {e.preventDefault();}}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-3">الاسم الكامل *</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-3">البريد الإلكتروني *</label>
                        <input
                            type="email"
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-3">رقم الهاتف</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-3">الموقع</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-gray-700 font-semibold mb-3">نبذة عنك</label>
                    <textarea
                        rows="4"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                    />
                </div>

                <div className="flex gap-4">
                    <button className="px-8 py-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">
                        إلغاء
                    </button>
                    <button
                        onClick={() => handleSave('profile')}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
                    >
                        حفظ التغييرات
                    </button>
                </div>
            </form>
        </div>
    );
}
export default ProfileSection;