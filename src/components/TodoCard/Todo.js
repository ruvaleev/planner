import React from 'react';
import PropTypes from 'prop-types';

import close from './close.png';

const CloseIcon = ({ callback }) => (
  <button type="button" onClick={callback} onKeyDown={callback}>
    <img src={close} alt="close" className="w-4 h-4 cursor-pointer" />
  </button>
);

const Todo = ({ todo, toggleReady, removeTodo }) => (
  <div key={todo.id} className="flex justify-between items-center">
    <CloseIcon callback={() => removeTodo(todo.id)} />
    <label htmlFor={todo.id} className="mx-4">{todo.fields.title}</label>
    <input
      id={todo.id}
      onChange={() => toggleReady(todo.id)}
      type="checkbox"
      checked={!!todo.fields.completed}
    />
  </div>
);

CloseIcon.propTypes = {
  callback: PropTypes.func.isRequired,
};

Todo.propTypes = {
  todo: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
  toggleReady: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default Todo;
