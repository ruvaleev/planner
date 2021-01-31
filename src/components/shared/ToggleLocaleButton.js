import React, { useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import { chooseNewLocale } from './functions';

function ToggleLocaleButton() {
  const [locale, setLocale] = useState(chooseNewLocale());

  const { t } = useTranslation();

  return (
    <Button
      title={t('change language')}
      callback={() => {
        i18n.changeLanguage(locale);
        setLocale(chooseNewLocale());
      }}
    />
  );
}

export default ToggleLocaleButton;
