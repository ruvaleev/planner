import { connect } from 'react-redux';

import Todo from './Todo';
import { toggleReady, removeTodo } from '../../redux/slices/todos';

const mapDispatchToProps = (dispatch) => ({
  toggleReady: (data) => dispatch(toggleReady(data)),
  removeTodo: (data) => dispatch(removeTodo(data)),
});

export default connect(null, mapDispatchToProps)(Todo);
