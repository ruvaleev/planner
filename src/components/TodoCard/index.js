import { connect } from 'react-redux';

import Todo from './Todo';
import { toggleReady } from '../../redux/slices/todos';

const mapDispatchToProps = (dispatch) => ({
  toggleReady: (data) => dispatch(toggleReady(data)),
});

export default connect(null, mapDispatchToProps)(Todo);
