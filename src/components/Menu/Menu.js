import React from 'react';

function Menu({
  editable, toggleEditable, undo, redo,
}) {
  return (
    <div className="fixed -m-16 text-xl">
      <button className="px-4" onClick={() => toggleEditable(editable)}>Edit</button>
      <button className="px-4" onClick={() => undo()}>Undo</button>
      <button className="px-4" onClick={() => redo()}>Redo</button>
    </div>
  );
}

export default Menu;
