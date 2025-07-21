import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import translations
import en from "../translations/en/translation.json"
import sq from "../translations/sq/translation.json"

i18n
    .use(LanguageDetector)       // auto‑detect language (from browser or path)
    .use(initReactI18next)       // pass i18n instance to react-i18next
    .init({
        resources: {
            sq: { translation: sq },
            en: { translation: en },
        },
        fallbackLng: 'sq',         // default if detection fails
        interpolation: {
            escapeValue: false,      // React already escapes
        },
        detection: {
            // optional: customize detection order/sources
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            caches: ['cookie'],
        },
    });

export default i18n;