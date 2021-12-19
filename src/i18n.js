import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEN from "./public/locales/en/translate.json";
import translationDE from "./public/locales/de/translate.json";
import translationFR from "./public/locales/fr/translate.json";
import transaltionIT from "./public/locales/it/translate.json";
import translationES from "./public/locales/es/translate.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  fr: {
    translation: translationFR,
  },
  it: {
    translation: transaltionIT,
  },
  es: {
    translation: translationES,
  },
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
