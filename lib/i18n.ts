import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import "intl-pluralrules";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

i18n.use(initReactI18next).init({
    resources,
    lng: I18nManager.isRTL ? "ar" : "en", // default language based on layout
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
