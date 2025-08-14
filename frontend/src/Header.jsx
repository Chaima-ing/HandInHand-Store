import { FaBoxOpen, FaHome, FaInfoCircle,FaHandHoldingHeart,FaSearch, FaPhone,FaHandshake } from "react-icons/fa";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <FaHandshake className="Hand-icon"/>متجر <span>غزة</span> للجميع
                </div>
                {/* Search */}
                <div className="search">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="ابحث عن المنتجات..." />
                </div>
                {/* Navigation */}
                    <nav className="nav">
                        <a href="#"><FaHome/> الرئيسية</a>
                        <a href="#"><FaBoxOpen/> المنتجات</a>
                        <a href="#"><FaHandHoldingHeart/>التبرعات</a>
                        <a href="#"><FaInfoCircle />عنا</a>
                        <a href="#"><FaPhone />اتصل بنا</a>
                    </nav>
                {/* Buttons */}
                <div className="auth-buttons">
                    <button className="btn-outline">تسجيل الدخول</button>
                    <button className="btn-green">إنشاء حساب</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
