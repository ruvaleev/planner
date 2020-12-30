import { connect } from 'react-redux';
import AreasCard from './AreasCard';

const mapStateToProps = (state) => ({
  isLoading: state.areasReducer.isLoading,
  isError: state.areasReducer.isError,
  error: state.areasReducer.error,
  areas: state.areasReducer.areas,
});

export default connect(mapStateToProps)(AreasCard);
