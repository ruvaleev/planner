import React from 'react';

import TodosList from './TodosList';
import TodoForm from './TodoForm';
import LoadingScreen from '../shared/LoadingScreen';

function TodosCard ({isLoading, isError, error, areaId, todos, createTodo}) {
  return (
    <>
      <LoadingScreen isLoading={isLoading} isError={isError} error={error}/>
      <TodosList todos={todos}/>
      <TodoForm onSubmit={
        data => {createTodo({title: data, areaId: areaId})}
      } title='Добавить задачу'/>
    </>
    )
}

export default TodosCard;
