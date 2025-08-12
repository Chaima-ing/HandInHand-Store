import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locals/en.json';
import ar from './locals/ar.json';

i18next
    .use(initReactI18next)
    .init({
        lng: localStorage.getItem('language') || 'en', // Default to English
        resources: {
            en: { translation: en },
            ar: { translation: ar },
        },
        interpolation: {
            escapeValue: false, // React handles XSS
        },
    });

export default i18next;