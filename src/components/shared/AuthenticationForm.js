import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function AuthenticationForm({ onSubmit }) {
  const { t } = useTranslation();

  return (
    <form
      className="flex flex-col items-center mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
        });
        e.target.elements.email.value = '';
        e.target.elements.password.value = '';
      }}
    >
      <input type="text" name="email" placeholder={t('email')} className="h-6 pl-8 mt-3 w-full italic bordered" />
      <input type="password" name="password" placeholder={t('password')} className="h-6 pl-8 mt-3 w-full italic bordered" />
      <button type="submit" className="h-6 w-6 mt-3 w-full bordered">
        {t('submit')}
      </button>
    </form>
  );
}

export default AuthenticationForm;

AuthenticationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
