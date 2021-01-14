import { connect } from 'react-redux';

import TodosCard from './TodosCard';
import { createTodo } from '../../redux/slices/todos';
import { selectTodos } from '../shared/functions';

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.todosReducer.present.isLoading,
  isError: state.todosReducer.present.isError,
  error: state.todosReducer.present.error,
  todos: selectTodos(
    state.todosReducer.present.todos, ownProps.areaId,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  createTodo: (data) => dispatch(createTodo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosCard);
