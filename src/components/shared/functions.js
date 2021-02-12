/* eslint-disable import/prefer-default-export */
import i18n from 'i18next';

export function chooseNewLocale() {
  return ['en', 'ru'].find((locale) => locale !== i18n.language);
}

const translatableErrors = [
  'error.response is undefined',
  'e.response is undefined',
];

export function castErrorMessage(message) {
  return translatableErrors.includes(message) ? i18n.t(message) : message;
}
