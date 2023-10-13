import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ua, en, de, fr, it } from "./translations";
import { findBestLanguageTag } from "react-native-localize";
//empty for now
const resources = {
    en: {
        translation: en,
    },
    uk: {
        translation: ua,
    },
    de: {
        translation: de,
    },
    fr: {
        translation: fr,
    },
    it: {
        translation: it,
    }
};

const primaryLanguage = findBestLanguageTag(Object.keys(resources));

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: primaryLanguage.languageTag, // Default language
    //language to use if translations in user language are not available
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
});




export default i18n;