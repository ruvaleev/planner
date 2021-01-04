import React from 'react';
import PropTypes from 'prop-types';

import Todo from '../Todo';

function TodosList({ todos }) {
  return (
    <div className="w-full">
      {
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))
      }
    </div>
  );
}

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
};

export default TodosList;
