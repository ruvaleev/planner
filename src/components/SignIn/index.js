import { connect } from 'react-redux';

import { resetError, signIn, signUp } from '../../redux/slices/authentications';
import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading,
  isError: state.authenticationsReducer.isError,
  error: state.authenticationsReducer.error,
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch(resetError()),
  signUp: (data) => dispatch(signUp(data)),
  signIn: (data) => dispatch(signIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
