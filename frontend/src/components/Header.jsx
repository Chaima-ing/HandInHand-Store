import { FaBoxOpen, FaHome, FaInfoCircle,FaShoppingCart,FaUser,FaHandHoldingHeart, FaPhone,FaHandshake } from "react-icons/fa";
import "./styles/Header.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function Header() {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language || 'en');
    const navigate = useNavigate();

    const { user, isAuthenticated } = useContext(AuthContext);
    console.log("Header sees user:", user);
    {/*

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng).then(() => {
            console.log("Language changed");
        });
        setLanguage(lng);
        localStorage.setItem('language', lng);
        document.documentElement.setAttribute('dir', lng === "ar" ? 'rtl' : 'ltr');
    };
    */}

    useEffect(() => {
        document.documentElement.setAttribute('dir', language === "ar" ? 'rtl' : 'ltr');
    }, [language]);


    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <FaHandshake className="Hand-icon"/>{t("Store")}<span>{t("GAZA")}</span>
                </div>
                {/* Search
                <div className="search">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder={t("search_products_placeholder")} />
                </div>*/}
                {/* Navigation */}
                    <nav className="nav">
                        <a href="/"><FaHome/> {t("home_page")}</a>
                        <a href="/shoppingPage"><FaBoxOpen/>{t("products")}</a>
                        <a href="#"><FaHandHoldingHeart/>{t("donations")}</a>
                        <a href="#"><FaInfoCircle />{t("aboutUs")}</a>
                        <a href="#"><FaPhone />{t("Communicate_with_us")}</a>
                    </nav>
                {/* Buttons */}
                <div className="auth-buttons">
                    {user ? (
                        <>
                            <button
                                className="btn-outline"
                                onClick={() => navigate("/shopingCart")}
                            >
                                <FaShoppingCart />
                            </button>
                            <button
                                className="btn-green"
                                onClick={() => navigate("/profile")}
                            >
                                <FaUser />
                            </button>
                        </>
                    ):(
                        <>
                            <button className="btn-outline" onClick={() => navigate("/login")}>{t("Login")}</button>
                            <button className="btn-green" onClick={() => navigate("/register")}>{t("register")}</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
