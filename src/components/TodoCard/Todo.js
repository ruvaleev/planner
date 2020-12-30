import React from 'react';

const Todo = ({ todo, toggleReady }) => (
  <div key={todo.id} className="flex justify-between">
    <label htmlFor={todo.id} className="mx-4">{todo.fields.title}</label>
    <input
      id={todo.id}
      onChange={() => toggleReady(todo.id)}
      type="checkbox"
      checked={!!todo.fields.completed}
    />
  </div>
);

export default Todo;
