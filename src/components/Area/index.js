import { connect } from 'react-redux';

import { chooseArea } from '../../redux/slices/areas';
import Area from './Area';

const mapStateToProps = (state) => ({
  isLoading: state.areasReducer.isLoading,
  isError: state.areasReducer.isError,
  error: state.areasReducer.error,
  areas: state.areasReducer.areas,
});

const mapDispatchToProps = (dispatch) => ({
  chooseArea: (data) => dispatch(chooseArea(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Area);
