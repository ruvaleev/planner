import React from 'react';
import PropTypes from 'prop-types';

import submit from './submit.svg';

function TodoForm({ onSubmit }) {
  return (
    <form
      className="flex items-center mt-4 bordered
      "
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target.elements.todoTitle.value);
        e.target.elements.todoTitle.value = '';
      }}
    >
      <input type="text" name="todoTitle" placeholder="Создать задачу..." className="h-6 pl-8 w-full italic" data-testid="Add todo" />
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
