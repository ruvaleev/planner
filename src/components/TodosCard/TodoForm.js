import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import submit from './submit.svg';

function TodoForm({ onSubmit }) {
  const { t } = useTranslation();
  return (
    <form
      className="flex items-center mt-4 bordered w-full z-10"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target.elements.todoTitle.value);
        e.target.elements.todoTitle.value = '';
      }}
    >
      <input type="text" name="todoTitle" placeholder={t('create todo placeholder')} className="h-6 px-8 w-full italic" data-testid="Add todo" />
      <button type="submit" className="h-6 w-6 -ml-6">
        <img src={submit} alt="submit" className="cursor-pointer" />
      </button>
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoForm;
