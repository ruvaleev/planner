import { connect } from 'react-redux';
import AreasList from './AreasList';

const mapStateToProps = (state) => ({
  isLoading: state.areasReducer.isLoading,
  isError: state.areasReducer.isError,
  error: state.areasReducer.error,
  areas: state.areasReducer.areas,
});

export default connect(mapStateToProps)(AreasList);
