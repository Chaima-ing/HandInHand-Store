import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';

const Auth = () => {
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.replace("/", "")||"login";

    const [action, setAction] = useState(currentPath);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [language, setLanguage] = useState(i18n.language || "en");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [resetFailed, setResetFailed] = useState(false);



    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
        localStorage.setItem("language", lang);
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    };

    useEffect(() => {
        document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    }, [language]);

    useEffect(() => {
        setAction(currentPath);
    }, [currentPath]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);


        if(action === "login"){
            if(!email.trim()){
                setError(t("error_email_required"));
                setLoading(false);
                return;
            }
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                setError(t("error_invalid_email"));
                setLoading(false);
                return;
            }
            if(!password.trim()){
                setError(t("error_password_required"))
                setLoading(false);
                return;
            }
        }else if(action === "register"){
            if(!username.trim()){
                setError(t("error_username_required"));
                setLoading(false);
                return;
            }
            if(!email.trim()){
                setError(t("error_email_required"));
                setLoading(false);
                return;
            }
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                setError(t("error_invalid_email"));
                setLoading(false);
                return;
            }
            if(!phoneNumber.trim()){
                setError(t("error_phone_required"));
                setLoading(false);
                return;
            }
            if(!password.trim()){
                setError(t("error_password_required"));
                setLoading(false);
                return;
            }
            if (password.length < 6) {
                setError(t("error_password_length"));
                setLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                setError(t("error_password_mismatch"));
                setLoading(false);
                return;
            }
        }else if (action === "forgot_password") {
            if (!email.trim()) {
                setError(t("error_email_required"));
                setLoading(false);
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError(t("error_invalid_email"));
                setLoading(false);
                return;
            }
            try{
                if (action === "login"){
                    await axios.post("/users", {email: email, password: password});
                    navigate("/login");
                }
                else if(action === "register"){
                    await axios.post("/users", {email: email, password: password, phoneNumber: phoneNumber, username: username, confirmPassword: confirmPassword});
                    navigate("/register");
                }
                else if(action === "forgot_password"){
                   // await axios.post("/forgot-password", {email: email});
                    setResetSent(true);
                }
            }catch (err){
                setError(t(`error_${action}_failed`) + (err.message ? `: ${err.message}` : ""));
            }
        }

        setLoading(false);
    };

    const handleRetry = () => {
        setResetFailed(false);
        setResetSent(false); // Reset to allow retry
    };
    const handleResetFailed = () => {
        setResetFailed(true);
    }

    return(
        <div className="bg-white rounded-2xl h-auto flex flex-col items-center justify-center w-1/2 pt-4 pb-4 m-auto">
            <div>
                {action === "forgot_password" && resetSent ? (
                    <img src="/public/mail.png"
                    alt="mail.img"
                    className="mx-auto mb-2 w-24 h-auto"/>
                ) : action === "forgot_password" ? (
                    <img
                    src="/public/key.png"
                    alt="key.png"
                    className="mx-auto mb-2 w-24 h-auto"
                    />
                ) : (
                    <div className="border-t-4 border-green-700 pt-4" />
                )}
                <h2 className="text-2xl font-bold text-center mt-4">
                    {(() => {
                        if (action === "login") return t("login_title");
                        if (action === "register") return t("register_title");
                        if (action === "forgot_password") {
                            return resetSent ? t("reset_sent") : t("forgot_password_title");
                        }
                        return ""; // Explicit fallback
                    })()}
                </h2>
            </div>

            <hr className="my-3" />
            {action === "register" && <p>Start using our website to elp people in GAZA</p>}
            <div className="bg_white p-6 w-full max-w-md">
                {action === "forgot_password" && resetSent ? (
                    <>
                    <p className="text-green-700 text-center">{t("reset_sent_message")}</p>
                    <button type="button"
                            className="bg-green-700 text-white mt-4 px-4 py-2 rounded-2xl w-full"
                            onClick={(e) => {
                                e.preventDefault();
                                handleResetFailed();
                            }}
                    >
                        {t("reset_button")}
                    </button>
                        <p className="mt-4 text-gray-700 text-center">{t("no_email")}</p>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRetry();
                            }}
                            className="text-red-500 text-center mt-4 block underline"
                        >
                            {t("resend_email")}
                        </a>
                    </>
                ) : (
                <form className="space-y-4 border-t border-gray-300 pt-4"
                onSubmit={handleSubmit}>
                    {action === "register" && (
                        <div>
                            <label
                                htmlFor="username"
                                className={`block text-sm font-medium text-gray-700 mb-1 ${
                                    language === "ar" ? "text-right" : "text-left"
                                }`}>
                                {t("username_label")}
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder={t("username_placeholder")}
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className={`block text-sm font-medium text-gray-700 mb-1 ${
                                language === "ar" ? "text-right" : "text-left"
                            }`}
                        >
                            {t("email_label")}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder={t("email_placeholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    {action === "register" &&(
                        <div>
                            <label
                                htmlFor="phone"
                                className={`block text-sm font-medium text-gray-700 mb-1 ${
                                    language === "ar" ? "text-right" : "text-left"
                                }`}
                            >
                                {t("phone_label")}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder={t("phone_placeholder")}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    )}
                    {action !== "forgot_password" && (
                    <div>
                        <label
                            htmlFor="password"
                            className={`block text-sm font-medium text-gray-700 mb-1 ${
                                language === "ar" ? "text-right" : "text-left"
                            }`}
                        >
                            {t("password_label")}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder={t("password_placeholder")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    )}
                    {action === "register" && (
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className={`block text-sm font-medium text-gray-700 mb-1 ${
                                    language === "ar" ? "text-right" : "text-left"
                                }`}
                            >
                                {t("reassure_password_label")}
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder={t("reassure_placeholder")}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    )}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="bg-green-700 text-white mt-4 px-4 py-2 rounded-2xl w-full"
                        disabled={loading}
                    >
                        {loading ? t("loading") :
                            action === "login" ? t("login_button") :
                                action === "register" ? t("register_button") :
                                    action === "forgot_password" ? t("reset_button_") : ""}
                    </button>
                </form>
                )}
                {action === "login" && (
                    <span className="text-red-500 text-sm mt-4 cursor-pointer"
                    onClick={() => navigate("/forgot_password")}
                    >
                        {t("forgot_password")}
                    </span>
                )}

            </div>

            <div className="w-3/4 flex flex-row items-center justify-center">
                <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    className={`m-4 ${language === "en" ? "text-emerald-700 font-bold" : "text-gray-700"}`}
                >
                    {t("english")}
                </button>
                <button
                    type="button"
                    onClick={() => changeLanguage("ar")}
                    className={`m-4 ${language === "ar" ? "text-emerald-700 font-bold" : "text-gray-700"}`}
                >
                    {t("arabic")}
                </button>
            </div>
            <br />
            <p className="mb-4 border-t border-gray-300 mt-4 pt-4 w-full max-w-md">
                {action === "login" ? t("no_account") :
                    action === "register" ? t("have_account"):
                action === "forgot_password" ? t("back_to_login" ) : " "}{" "}
                <span
                    className="text-green-800 ml-1 cursor-pointer"
                    onClick={() =>  {
                        if(action === "forgot_password"){
                        navigate("/login");
                        setResetSent(false);
                    }else{
                        navigate(action === "login" ? "/register" : "/login");
                    }
                    }}
                >
                    ({action === "login" ? t("register_link") : t("login_link")})
                </span>
            </p>
        </div>
    );
};

export default Auth;