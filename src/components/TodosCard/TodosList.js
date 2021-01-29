import React from 'react';
import PropTypes from 'prop-types';

import Todo from '../Todo';

function TodosList({ todos, areaId }) {
  return (
    <div className="todos-list w-full">
      {
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} areaId={areaId} />
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
  areaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TodosList;
