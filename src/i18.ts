import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { English, Russian } from './locales';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    lng: 'en',
    resources: {
      en: {
        translation: English,
      },
      ru: {
        translation: Russian,
      },
    },
  });

i18n.init({});

export { i18n };
