import React from 'react';
import PropTypes from 'prop-types';

import close from './close.svg';

const CloseIcon = ({ callback }) => (
  <button type="button" onClick={callback} onKeyDown={callback} className="ml-auto">
    <img src={close} alt="close" className="w-4 h-4 cursor-pointer" />
  </button>
);

const Todo = ({ todo, toggleReady, removeTodo }) => (
  <div key={todo.id} className="flex justify-start items-center">
    <input
      id={todo.id}
      type="checkbox"
      className="ml-auto cursor-pointer"
      onChange={() => toggleReady(todo.id)}
      checked={!!todo.fields.completed}
    />
    <label htmlFor={todo.id} className="mx-4 text-2xl cursor-pointer todo">{todo.fields.title}</label>
    <CloseIcon callback={() => removeTodo(todo.id)} />
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
