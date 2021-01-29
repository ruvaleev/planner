import React from 'react';
import PropTypes from 'prop-types';

import TodosList from './TodosList';
import TodoForm from './TodoForm';

function TodosCard({ areaId, todos, createTodo }) {
  return (
    <>
      <TodosList todos={todos} areaId={areaId} />
      <TodoForm
        onSubmit={
          (data) => { createTodo({ title: data, areaId }); }
        }
      />
    </>
  );
}

TodosCard.propTypes = {
  areaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
  createTodo: PropTypes.func.isRequired,
};

export default TodosCard;
