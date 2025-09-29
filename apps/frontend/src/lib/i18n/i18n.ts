import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";

import engLang from "./locale/en/engLang.json";
import bgLang from "./locale/bg/bgLang.json";

const resources = {
  en: {
    translation: engLang,
  },
  bg: {
    translation: bgLang,
  },
};
//FIX -> handle stored lng
// let savedLang: string | undefined;
// if (typeof window !== "undefined") {
//   savedLang = localStorage.getItem("language") || "en";
// } else {
//   savedLang = "en";
// }

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
