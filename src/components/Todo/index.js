import { connect } from 'react-redux';

import Todo from './Todo';
import { removeTodo, toggleReady } from '../../redux/slices/areas';

const mapDispatchToProps = (dispatch) => ({
  toggleReady: (data) => dispatch(toggleReady(data)),
  removeTodo: (data) => dispatch(removeTodo(data)),
});

export default connect(null, mapDispatchToProps)(Todo);
