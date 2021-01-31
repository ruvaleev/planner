import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLocale from './en.json';
import ruLocale from './ru.json';

const localesFiles = Object.assign(enLocale, ruLocale);

function Locales() {
  i18n
    .use(initReactI18next)
    .init({
      resources: localesFiles,
      fallbackLng: 'en',
    });
}
export default Locales;
