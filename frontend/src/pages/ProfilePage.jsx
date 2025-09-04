import React, {useContext, useState} from 'react';
import {User, Shield, Bell, Store, Heart, Globe, Trash2, Home, Package, PlusCircle, BarChart3, ShoppingCart, Upload, InfoIcon} from 'lucide-react';
import AuthContext from "../context/AuthContext";
import DeleteSection from "../components/DeleteSection.jsx";
import ProfileSection from "../components/ProfileSection.jsx";
import SecuritySection from "../components/SecuritySection.jsx";

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [donationPercent, setDonationPercent] = useState(100);
    const [notifications, setNotifications] = useState({
        email: true,
        inApp: true,
        newOrders: true,
        donations: true,
        offers: false
    });

    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(AuthContext);

    const toggleNotification = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const Sidebar = () => (
        <aside className="w-64 bg-black text-white min-h-screen fixed top-0 right-0 flex flex-col shadow-xl z-50">
            <div className="text-center py-6 border-b border-white/10 mb-5">
                <h1 className="text-xl font-bold mb-1">متجر غزة للجميع</h1>
                <p className="text-gray-400 text-sm">كل التبرعات لدعم أهالي غزة</p>
            </div>

            <nav className="flex-1">
                <ul className="space-y-1">
                    <li><a href="/" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                        <Home className="ml-3 w-5 h-5" />
                        <span>الرئيسية</span>
                    </a></li>
                    <li><a href="/ShoppingPage" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                        <Package className="ml-3 w-5 h-5" />
                        <span>المنتجات</span>
                    </a></li>
                    <li><a href="#" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                        <PlusCircle className="ml-3 w-5 h-5" />
                        <span>إضافة منتج</span>
                    </a></li>
                    <li><a href="#" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                        <BarChart3 className="ml-3 w-5 h-5" />
                        <span>لوحة التحكم</span>
                    </a></li>
                    <li><a href="#" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                        <ShoppingCart className="ml-3 w-5 h-5" />
                        <span>الطلبات</span>
                    </a></li>
                    <li><a href="#" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                        <Heart className="ml-3 w-5 h-5" />
                        <span>تبرعاتي</span>
                    </a></li>
                </ul>
            </nav>
        </aside>
    );

    const SettingsNav = () => {
        const navItems = [
            { id: 'profile', icon: User, label: 'الملف الشخصي' },
            { id: 'security', icon: Shield, label: 'الأمان' },
            { id: 'notifications', icon: Bell, label: 'الإشعارات' },
            { id: 'store', icon: Store, label: 'إعدادات المتجر' },
            { id: 'donation', icon: Heart, label: 'تفضيلات التبرع' },
            { id: 'language', icon: Globe, label: 'اللغة والمنطقة' },
            { id: 'delete', icon: Trash2, label: 'حذف الحساب' }
        ];

        return (
            <nav className="bg-white rounded-2xl shadow-lg p-0 min-w-[280px]">
                <ul>
                    {navItems.map((item, index) => (
                        <li key={item.id} className={index < navItems.length - 1 ? 'border-b border-gray-100' : ''}>
                            <button
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center px-6 py-4 text-right transition-all duration-300 border-r-4 ${
                                    activeSection === item.id
                                        ? 'bg-green-50 border-green-600 text-green-600 font-bold'
                                        : 'border-transparent text-gray-600 hover:bg-green-50 hover:text-green-600'
                                }`}
                            >
                                <item.icon className="ml-4 w-5 h-5" />
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    const NotificationToggle = ({ label, description, checked, onChange }) => (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <div>
                <h3 className="font-semibold text-gray-900 mb-1">{label}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition-colors relative">
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </div>
            </label>
        </div>
    );

    const NotificationsSection = () => (
        <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[620px]">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                    <Bell className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">الإشعارات</h2>
            </div>
            <p className="text-gray-600 mb-8">إدارة تفضيلات الإشعارات والاتصالات</p>

            <div className="space-y-1 mb-8">
                <NotificationToggle
                    label="الإشعارات عبر البريد الإلكتروني"
                    description="تلقي تحديثات مهمة عبر البريد الإلكتروني"
                    checked={notifications.email}
                    onChange={() => toggleNotification('email')}
                />
                <NotificationToggle
                    label="الإشعارات داخل التطبيق"
                    description="تلقي إشعارات داخل المتجر عند حدوث تحديثات"
                    checked={notifications.inApp}
                    onChange={() => toggleNotification('inApp')}
                />
                <NotificationToggle
                    label="إشعارات الطلبات الجديدة"
                    description="تلقي إشعار عند استلام طلبات جديدة"
                    checked={notifications.newOrders}
                    onChange={() => toggleNotification('newOrders')}
                />
                <NotificationToggle
                    label="إشعارات التبرعات"
                    description="تلقي تحديثات حول تأثير تبرعاتك في غزة"
                    checked={notifications.donations}
                    onChange={() => toggleNotification('donations')}
                />
                <NotificationToggle
                    label="عروض وتحديثات المتجر"
                    description="تلقي عروض خاصة وتحديثات من المتجر"
                    checked={notifications.offers}
                    onChange={() => toggleNotification('offers')}
                />
            </div>

            <div className="flex justify-start">
                <button
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                    حفظ التغييرات
                </button>
            </div>
        </div>
    );

    const StoreSection = () => (
        <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[620px]">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                    <Store className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">إعدادات المتجر</h2>
            </div>
            <p className="text-gray-600 mb-8">إدارة إعدادات متجرك الخاص</p>

            <div className="space-y-6 mb-8">
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">اسم المتجر *</label>
                    <input
                        type="text"
                        defaultValue="متجر غزة للجميع"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">وصف المتجر</label>
                    <textarea
                        rows="4"
                        defaultValue="متجر غزة للجميع هو منصة لبيع المنتعات وتوجيه جميع الأرباح لدعم العائلات المحتاجة في غزة. نسعى لتقديم أفضل المنتجات مع أكبر فائدة لأهلنا في غزة."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">عنوان المتجر</label>
                    <input
                        type="text"
                        defaultValue="شارع عمر المختار، غزة"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">شعار المتجر</label>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                            <img src="https://via.placeholder.com/80" alt="شعار المتجر" className="max-w-full max-h-full" />
                        </div>
                        <div>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm border-2 border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                                <Upload className="w-4 h-4" />
                                تغيير الشعار
                            </button>
                            <p className="text-xs text-gray-500 mt-2">يجب أن يكون الشعار بحجم 300×300 بكسل كحد أقصى</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="px-8 py-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">
                    إلغاء
                </button>
                <button
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                    حفظ التغييرات
                </button>
            </div>
        </div>
    );

    const DonationSection = () => (
        <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[620px]">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                    <Heart className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">تفضيلات التبرع</h2>
            </div>
            <p className="text-gray-600 mb-8">إدارة إعدادات التبرع لدعم أهالي غزة</p>

            <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-4">النسبة الافتراضية للتبرع من الأرباح</label>
                <div className="flex items-center gap-4 mb-4">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={donationPercent}
                        onChange={(e) => setDonationPercent(e.target.value)}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-xl font-bold text-green-600 min-w-[60px]">{donationPercent}%</span>
                </div>
                <div className="flex items-center gap-2 p-4 bg-green-50 rounded-xl">
                    <InfoIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-700 font-medium">
                        تبرعك بنسبة {donationPercent}% يعني أن {donationPercent === '100' ? 'كل' : donationPercent + '% من'} الأرباح ستذهب لدعم أهالي غزة
                    </p>
                </div>
            </div>

            <div className="space-y-6 mb-8">
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">الجهة المتبرع لها</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100">
                        <option value="unrwa">الأونروا - غزة</option>
                        <option value="red-crescent">الهلال الأحمر الفلسطيني</option>
                        <option value="medical-aid">مركز المساعدات الطبية</option>
                        <option value="other">منظمة أخرى</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-4">تقرير التبرعات</label>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">إرسال تقارير شهرية عن التبرعات</h3>
                            <p className="text-sm text-gray-600">تلقي تقرير شهري مفصل عن تبرعاتك وأثرها</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors relative">
                                <div
                                    className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform transform peer-checked:translate-x-6"
                                ></div>
                            </div>
                        </label>


                    </div>
                </div>
            </div>

            <div className="flex justify-start">
                <button
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                    حفظ التفضيلات
                </button>
            </div>
        </div>
    );

    const LanguageSection = () => (
        <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[620px]">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center ml-4">
                    <Globe className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">اللغة والمنطقة</h2>
            </div>
            <p className="text-gray-600 mb-8">إدارة إعدادات اللغة والمنطقة الزمنية</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">اللغة *</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100">
                        <option value="ar">العربية</option>
                        <option value="en">الإنجليزية</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">المنطقة الزمنية *</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100">
                        <option value="asia/gaza">(UTC+2) غزة</option>
                        <option value="asia/amman">(UTC+2) عمّان</option>
                        <option value="asia/beirut">(UTC+2) بيروت</option>
                        <option value="asia/riyadh">(UTC+3) الرياض</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">العملة *</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100">
                        <option value="ils">شيكل جديد (₪)</option>
                        <option value="usd">دولار أمريكي ($)</option>
                        <option value="eur">يورو (€)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-3">تنسيق التاريخ</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-3 focus:ring-green-100">
                        <option value="dd/mm/yyyy">يوم/شهر/سنة (٢٧/٠٧/٢٠٢٥)</option>
                        <option value="mm/dd/yyyy">شهر/يوم/سنة (٠٧/٢٧/٢٠٢٥)</option>
                        <option value="yyyy-mm-dd">سنة-شهر-يوم (٢٠٢٥-٠٧-٢٧)</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-start">
                <button
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                    حفظ الإعدادات
                </button>
            </div>
        </div>
    );

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'profile': return <ProfileSection />;
            case 'security': return <SecuritySection />;
            case 'notifications': return <NotificationsSection />;
            case 'store': return <StoreSection />;
            case 'donation': return <DonationSection />;
            case 'language': return <LanguageSection />;
            case 'delete': return <DeleteSection isLoading = {isLoading} setIsLoading = {setIsLoading} setUser = {setUser} />;
            default: return <ProfileSection />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex" dir="rtl">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 mr-64 p-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                        الإعدادات
                        <div className="absolute -bottom-3 right-1/2 transform translate-x-1/2 w-24 h-1 bg-green-600 rounded"></div>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
                        إدارة إعدادات حسابك وتفضيلات المتجر لدعم أهالي غزة
                    </p>
                </div>

                {/* Settings Container */}
                <div className="flex gap-8 max-w-7xl mx-auto">
                    <SettingsNav />

                    {/* Settings Content */}
                    <div className="flex-1 min-w-0">
                        {renderActiveSection()}
                    </div>
                </div>
            </main>

        </div>
    );
};

export default ProfilePage;