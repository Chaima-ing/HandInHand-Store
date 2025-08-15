import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

const Login = () => {
    const { t, i18n } = useTranslation();
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [language, setLanguage] = useState(i18n.language || 'en');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
        localStorage.setItem('language', lng);
        document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
    };

    useEffect(() => {
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    }, [language]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if (!Email.trim()) {
            setError(t('error_email_required'));
            setLoading(false);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
            setError(t('error_invalid_email'));
            setLoading(false);
            return;
        }
        if (!password.trim()) {
            setError(t('error_password_required'));
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError(t('error_password_length'));
            setLoading(false);
            return;
        }

        try {
            // Simulate successful login
            console.log('Email:', Email, 'Password:', password);
            setError(t('success_login'));
            // Optional: Redirect to admin dashboard after login
            // navigate('/admin-dashboard');
        } catch (err) {
            setError(t('error_login_failed') + (err.message ? `: ${err.message}` : ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[17px] h-auto flex flex-col items-center justify-center max-w-md mx-auto p-4 m-auto">
            <h2 className="text-2xl font-bold text-center mt-4">{t('admin_login_title')}</h2>
            <hr className="my-3" />
            <div className="bg-white p-6 w-full max-w-md">
                <form className="space-y-4 border-t border-gray-300 pt-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                        >
                            {t('email_label')}
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder={t('email_placeholder')}
                            value={Email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                        >
                            {t('password_label')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder={t('password_placeholder')}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="bg-green-700 text-white mt-4 px-4 py-2 rounded-[20px] w-full"
                        disabled={loading}
                    >
                        {loading ? t('loading') : t('login_button')}
                    </button>
                </form>
            </div>
            <a href="" className="text-gray-800 mt-4">{t('forgot_password')}</a>
            <div className="w-3/4 flex flex-row items-center justify-center border-t border-gray-300 mt-4 pt-4">
                <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    className={`m-4 ${language === 'en' ? 'text-emerald-700 font-bold' : 'text-gray-700'}`}
                >
                    {t('english')}
                </button>
                <button
                    type="button"
                    onClick={() => changeLanguage('ar')}
                    className={`m-4 ${language === 'ar' ? 'text-emerald-700 font-bold' : 'text-gray-700'}`}
                >
                    {t('arabic')}
                </button>
            </div>
            <br />
            <p className="mb-4">
                {t('no_account')}
                <Link to="/AdminRegister" className="text-green-800 ml-1">{t('register_link')}</Link>
            </p>
        </div>
    );
};

export default Login;