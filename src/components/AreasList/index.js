import { connect } from 'react-redux';
import AreasList from './AreasList';
import { resetError } from '../../redux/slices/areas';

const mapStateToProps = (state) => ({
  isLoading: state.areasReducer.isLoading,
  isError: state.areasReducer.isError,
  error: state.areasReducer.error,
  areas: state.areasReducer.areas,
});

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch(resetError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AreasList);
