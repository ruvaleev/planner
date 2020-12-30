import React from 'react';

function TodoForm ({onSubmit, title}) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e.target.elements.todoTitle.value);
      e.target.elements.todoTitle.value = '';
    }}>
      <input type='text' name='todoTitle' className='mr-4' data-testid='Add todo'/>
      <button>{title}</button>
    </form>
  )
}

export default TodoForm;
