/* eslint-disable import/prefer-default-export */
import i18n from 'i18next';

export function chooseNewLocale() {
  return ['en', 'ru'].find((locale) => locale !== i18n.language);
}

export function castErrorMessage(message) {
  return message === 'error.response is undefined' ? i18n.t(message) : message;
}
