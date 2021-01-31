import React, { useState } from 'react';
import i18n from 'i18next';
import { useHistory } from 'react-router-dom';

import { rootPath } from 'helpers/routes';
import { chooseNewLocale } from '../shared/functions';
import home from '../../assets/icons/home.svg';
import en from '../../assets/icons/en-lang.svg';
import ru from '../../assets/icons/ru-lang.svg';

function LanguagePanel() {
  const [locale, setLocale] = useState(chooseNewLocale());

  const localeIcon = i18n.language === 'en' ? en : ru;

  return (
    <button
      type="button"
      onClick={() => {
        i18n.changeLanguage(locale);
        setLocale(chooseNewLocale());
      }}
      className="cursor-pointer mx-2"
    >
      <img src={localeIcon} alt="change language" className="w-8" />
    </button>
  );
}

function HomeLink() {
  const history = useHistory();
  return (
    <button type="button" onClick={() => history.push(rootPath())} className="cursor-pointer mx-2">
      <img src={home} alt="home" className="w-8" />
    </button>
  );
}

function ControlPanel() {
  return (
    <div className="control-panel mt-4 flex justify-end">
      <LanguagePanel />
      <HomeLink />
    </div>
  );
}

export default ControlPanel;
