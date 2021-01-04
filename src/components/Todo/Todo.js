import React from 'react';
import PropTypes from 'prop-types';

import close from './close.svg';

const TodoCheckbox = ({ id, completed, toggleReady }) => (
  <>
    <input
      id={id}
      type="checkbox"
      className="ml-auto cursor-pointer"
      onChange={() => toggleReady(id)}
      checked={!!completed}
    />
  </>
);
/* eslint jsx-a11y/no-noninteractive-tabindex: 0,
          jsx-a11y/no-noninteractive-element-interactions: 0 */
const TodoLabel = ({ id, title, toggleReady }) => (
  <>
    <label
      htmlFor={id}
      onKeyUp={(e) => (e.keyCode === 13 || e.keyCode === 32) && toggleReady(id)}
      tabIndex="0"
      className="mx-4 text-2xl cursor-pointer todo"
    >
      {title}
    </label>
  </>
);

const CloseIcon = ({ callback }) => (
  <button type="button" onClick={callback} className="ml-auto">
    <img src={close} alt="close" className="w-4 h-4 cursor-pointer" />
  </button>
);

const Todo = ({ todo, toggleReady, removeTodo }) => (
  <div key={todo.id} className="flex justify-start items-center">
    <TodoCheckbox id={todo.id} completed={!!todo.fields.completed} toggleReady={toggleReady} />
    <TodoLabel id={todo.id} title={todo.fields.title} toggleReady={toggleReady} />
    <CloseIcon callback={() => removeTodo(todo.id)} />
  </div>
);

export default Todo;

TodoCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleReady: PropTypes.func.isRequired,
};

TodoLabel.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleReady: PropTypes.func.isRequired,
};

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
