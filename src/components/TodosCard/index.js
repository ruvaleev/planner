import { connect } from 'react-redux';

import TodosCard from './TodosCard';
import { createTodo } from '../../redux/slices/todos';
import { selectTodos } from '../shared/functions';

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.todosReducer.isLoading,
  isError: state.todosReducer.isError,
  error: state.todosReducer.error,
  todos: selectTodos(
    state.todosReducer.todos, ownProps.areaId,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  createTodo: (data) => dispatch(createTodo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosCard);
