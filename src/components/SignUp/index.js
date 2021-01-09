import { connect } from 'react-redux';

import { resetError, signUp } from '../../redux/slices/authentications';
import SignUp from './SignUp';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading,
  isError: state.authenticationsReducer.isError,
  error: state.authenticationsReducer.error,
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch(resetError()),
  signUp: (data) => dispatch(signUp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
