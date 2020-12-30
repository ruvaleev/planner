import React from 'react';
import PropTypes from 'prop-types';

function TodoForm({ onSubmit, title }) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e.target.elements.todoTitle.value);
      e.target.elements.todoTitle.value = '';
    }}
    >
      <input type="text" name="todoTitle" className="mr-4" data-testid="Add todo" />
      <button type="submit">{title}</button>
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default TodoForm;
