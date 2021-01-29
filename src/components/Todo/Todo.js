import React from 'react';
import PropTypes from 'prop-types';

import RemoveIcon from '../shared/RemoveIcon';

const TodoCheckbox = ({
  areaId, todoId, completed, toggleReady,
}) => (
  <>
    <input
      id={todoId}
      type="checkbox"
      className="ml-auto cursor-pointer"
      onChange={() => toggleReady({ todoId, areaId })}
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

const Todo = ({
  areaId, todo, toggleReady, removeTodo,
}) => (
  <div key={todo.id} className="flex justify-start items-center">
    <TodoCheckbox
      todoId={todo.id}
      areaId={areaId}
      completed={!!todo.completed}
      toggleReady={toggleReady}
    />
    <TodoLabel id={todo.id} title={todo.title} toggleReady={toggleReady} />
    <RemoveIcon callback={() => removeTodo({ id: todo.id, areaId })} />
  </div>
);

export default Todo;

TodoCheckbox.propTypes = {
  areaId: PropTypes.string.isRequired,
  todoId: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleReady: PropTypes.func.isRequired,
};

TodoLabel.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleReady: PropTypes.func.isRequired,
};

Todo.propTypes = {
  areaId: PropTypes.string.isRequired,
  todo: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object, PropTypes.bool],
    ),
  ).isRequired,
  toggleReady: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
