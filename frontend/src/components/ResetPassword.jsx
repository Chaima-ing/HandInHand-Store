import {useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {resetPassword} from "../api/authService.js";


const ResetPassword = () => {
    const { t, i18n } = useTranslation();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [language, setLanguage] = useState(i18n.language || "en");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
        localStorage.setItem("language", lang);
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!password || !confirmPassword) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }
        if (password.length < 6 || confirmPassword.length < 6) {
            setError(t("error_password_length"));
            setLoading(false);
            return;
        }
        if(password !== confirmPassword){
            setError("Passwords must match");
            setLoading(false);
            return;
        }

        try{
            await resetPassword(token, password);
            alert("Password reset successfully");
            navigate("/login");
        }catch (error){
            setError("Failed to reset password")+ (error.message ? `: ${error.message}` : "");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl h-auto flex flex-col items-center justify-center w-1/2 pt-4 pb-4 m-auto">
            <div>
                <img
                    src="key.png"
                    alt="key.png"
                    className="mx-auto mb-2 w-12 h-auto"
                />
                <h1 className="text-3xl font-bold mb-4 mt-4">{t("reset_password_title")}</h1>
            </div>
            <hr className="my-3" />
            <p className="font-bold text-green-800">{t("verify_code_title")}</p>
            <div className="bg_white p-6 w-full max-w-md">
                <form onSubmit={handleSubmit} className="max-w-md ms-auto p-4">

                  {error && <p className="text-red-500">{error}</p>}
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
                               placeholder={t("password_placeholder")}
                               className="mt-1 block w-full p-2 border border-gray-300 rounded"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                              />
                        </div>
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
                              placeholder={t("reassure_password_placeholder")}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                    </div>
                  <button type="submit"
                  className="bg-green-700 text-white mt-4 px-4 py-2 rounded-2xl w-full"
                  disabled={loading}>
                      {t("reset_button")}
                  </button>
              </form>
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
            <p>
                {t("back_to_login")}
                <span className="text-green-800 ml-1 cursor-pointer"
                      onClick={() =>  {
                          navigate("/login");
                      }}>
                    {t("login_link")}
                </span>
            </p>
        </div>
    );
};
export default ResetPassword;