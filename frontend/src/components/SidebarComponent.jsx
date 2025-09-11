import React from "react";
import { Heart, Home, Package, PlusCircle, Settings, ShoppingCart} from "lucide-react";

const SidebarComponent = () => {
    return (
        <aside className="w-64 bg-black text-white min-h-screen fixed top-0 right-0 flex flex-col shadow-xl z-10">
            <div className="text-center py-6 border-b border-white/10 mb-5">
                <h1 className="text-xl font-bold mb-1">متجر غزة للجميع</h1>
                <p className="text-gray-400 text-sm">كل التبرعات لدعم أهالي غزة</p>
            </div>

            <nav className="flex-1">
                <ul className="space-y-1">
                    <li>
                        <a href="/" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                            <Home className="ml-3 w-5 h-5" />
                            <span>الرئيسية</span>
                        </a>
                    </li>
                    <li>
                        <a href="/ProductsDashboard" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                            <Package className="ml-3 w-5 h-5" />
                            <span>المنتجات</span>
                        </a>
                    </li>
                    <li>
                        <a href="/AddProduct" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                            <PlusCircle className="ml-3 w-5 h-5" />
                            <span>إضافة منتج</span>
                        </a>
                    </li>
                    <li>
                        <a href="/orders" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                            <ShoppingCart className="ml-3 w-5 h-5" />
                            <span>الطلبات</span>
                        </a>
                    </li>
                    <li>
                        <a href="/donations" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                            <Heart className="ml-3 w-5 h-5" />
                            <span>تبرعاتي</span>
                        </a>
                    </li>
                    <li>
                        <a href="/ProfilePage" className="flex items-center px-6 py-4 hover:bg-white/5 transition-colors border-r-4 border-transparent">
                            <Settings className="ml-3 w-5 h-5" />
                            <span>الإعدادات</span>
                        </a>
                    </li>
                </ul>
            </nav>

        </aside>
    );
}

export default SidebarComponent;