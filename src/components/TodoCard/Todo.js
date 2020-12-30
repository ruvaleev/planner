import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todo, toggleReady }) => (
  <div key={todo.id} className="flex justify-between">
    <label htmlFor={todo.id} className="mx-4">{todo.fields.title}</label>
    <input
      id={todo.id}
      onChange={() => toggleReady(todo.id)}
      type="checkbox"
      checked={!!todo.fields.completed}
    />
  </div>
);

Todo.propTypes = {
  todo: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
  toggleReady: PropTypes.func.isRequired,
};

export default Todo;
