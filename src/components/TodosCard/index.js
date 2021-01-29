import { connect } from 'react-redux';

import TodosCard from './TodosCard';
import { createTodo } from '../../redux/slices/areas';

const mapDispatchToProps = (dispatch) => ({
  createTodo: (data) => dispatch(createTodo(data)),
});

export default connect(null, mapDispatchToProps)(TodosCard);
