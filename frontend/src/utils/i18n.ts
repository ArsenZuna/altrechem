import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import translations
import sq from "../translations/sq/translation.json"
import en from "../translations/en/translation.json"

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            sq: { translation: sq },
            en: { translation: en },
        },
        fallbackLng: 'sq',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            // only use cookie or localStorage (do NOT auto-detect browser language)
            order: ['cookie', 'localStorage'],
            caches: ['cookie'],
        },
    });

export default i18n;