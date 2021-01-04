import React from 'react';
import PropTypes from 'prop-types';

import TodosList from './TodosList';
import TodoForm from './TodoForm';
import withLoading from '../HOC/withLoading';

function TodosCard({ areaId, todos, createTodo }) {
  return (
    <>
      <TodosList todos={todos} />
      <TodoForm
        onSubmit={
          (data) => { createTodo({ title: data, areaId }); }
        }
      />
    </>
  );
}

TodosCard.propTypes = {
  areaId: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
  createTodo: PropTypes.func.isRequired,
};

export default withLoading(TodosCard);
