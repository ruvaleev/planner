import React from 'react';

import Todo from '../TodoCard';

function TodosList({ todos }) {
  return (
    <div className="w-full">
      {
        todos.map((todo, i) => (
          <Todo key={todo.id} todo={todo} />
        ))
      }
    </div>
  );
}

export default TodosList;
