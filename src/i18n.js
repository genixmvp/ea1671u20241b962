import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

/**
 * i18n configuration.
 * @summary English (default) and Spanish translations.
 * @author Carolina Navarro Aldoradin
 */
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, es }
});

export default i18n;
