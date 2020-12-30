import React from 'react';
import PropTypes from 'prop-types';

import TodosList from './TodosList';
import TodoForm from './TodoForm';
import LoadingScreen from '../shared/LoadingScreen';

function TodosCard({
  isLoading, isError, error, areaId, todos, createTodo,
}) {
  return (
    <>
      <LoadingScreen isLoading={isLoading} isError={isError} error={error} />
      <TodosList todos={todos} />
      <TodoForm
        onSubmit={
        (data) => { createTodo({ title: data, areaId }); }
      }
        title="Добавить задачу"
      />
    </>
  );
}

TodosCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  areaId: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
  createTodo: PropTypes.func.isRequired,
  error: PropTypes.string,
};

TodosCard.defaultProps = {
  error: '',
};

export default TodosCard;
