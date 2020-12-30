import React from 'react';
import PropTypes from 'prop-types';

function Menu({
  editable, toggleEditable, undo, redo,
}) {
  return (
    <div className="fixed -m-16 text-xl">
      <button type="button" className="px-4" onClick={() => undo()}>Undo</button>
      <button type="button" className="px-4" onClick={() => toggleEditable(editable)}>Edit</button>
      <button type="button" className="px-4" onClick={() => redo()}>Redo</button>
    </div>
  );
}

Menu.propTypes = {
  editable: PropTypes.bool.isRequired,
  toggleEditable: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
};

export default Menu;
