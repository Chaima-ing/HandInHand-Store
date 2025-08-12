import {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { Link} from 'react-router-dom';

const Register = () =>{
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [language, setLanguage] = useState(i18n.language || 'en');
    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);


    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
        localStorage.setItem('language', lng);
        document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
    };

    useEffect(() => {
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    }, [language]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if(!username.trim()){
            setError(t('error_username_required'));
            setLoading(false);
            return;
        }
        if(!email.trim()){
            setError(t('error_email_required'));
            setLoading(false);
            return;
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setError(t('error_invalid_email'));
            setLoading(false);
            return;
        }
        if(!phoneNumber.trim()){
            setError(t('error_phone_required'));
            setLoading(false);
            return;
        }
        if(!password.trim()){
            setError(t('error_password_required'));
            setLoading(false);
            return;
        }
        if(password.length<6){
            setError(t('error_password_length'));
            setLoading(false);
            return;
        }
        if(password !== confirm_password){
            setError(t('error_password_mismatch'));
            setLoading(false);
            return;
        }

        try{
            console.log('Register with:', { username, email, phoneNumber, password });
            setError(t('success_register'));
        }catch (error){
            setError(t('error_register_failed') + (error.message ? `: ${error.message}` : ''));
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="bg-white rounded-2xl h-auto flex flex-col items-center justify-center w-1/2 pt-4 pb-4 m-auto">
            <h2 className="text-2xl font-bold text-center mt-4 border-t-4 border-green-700 pt-4">{t('register_title')}</h2>
            <hr className="my-3" />
            <p>Start using our website to help people in GAZA</p>
            <div className="bg-white p-6 w-full max-w-md ">

                <form className="space-y-4 border-t border-gray-300 pt-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username"
                               className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                            {t('username_label')}
                        </label>
                        <input type="text"
                               name="username"
                               placeholder={t('username_placeholder')}
                               value={username}
                               onChange={(event)=>{setUsername(event.target.value)}}
                               className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <label htmlFor="email"
                               className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                            {t('email_label')}
                        </label>
                        <input type="email"
                               name="email"
                               placeholder={t('email_placeholder')}
                               value={email}
                               onChange={(event)=>{setEmail(event.target.value)}}
                               className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <label htmlFor="phone"
                               className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                            {t('phone_label')}
                        </label>
                        <input type="tel"
                               name="phone"
                               placeholder={t('phone_placeholder')}
                               value={phoneNumber}
                               onChange={(event)=>{setPhoneNumber(event.target.value)}}
                               className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <label htmlFor="password"
                               className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                            {t('password_label')}
                        </label>
                        <input type="password"
                               name="password"
                               placeholder={t('password_placeholder')}
                               value={password}
                               onChange={(event)=>{setPassword(event.target.value)}}
                               className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <label htmlFor="confirm_password"
                               className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                            {t('reassure_password_label')}
                        </label>
                        <input type="password"
                               name="confirm_password"
                               placeholder={t('reassure_placeholder')}
                               value={confirm_password}
                               onChange={(event)=>{setConfirmPassword(event.target.value)}}
                               className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit"
                            className="bg-green-700 text-white mt-4 px-4 py-2 rounded-2xl w-full"
                            disabled={loading}
                    >
                        {t('register_button')}
                    </button>
                </form>

            </div>
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
            <br/>
            <p className="mb-4">{t('have_account')} <Link to="/Login" className="text-green-800 ml-1">({t('login_link')})</Link></p>
        </div>
    )
}



export default Register;