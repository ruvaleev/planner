import { connect } from 'react-redux';

import { resetError, signIn } from '../../redux/slices/authentications';
import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading,
  isError: state.authenticationsReducer.isError,
  error: state.authenticationsReducer.error,
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch(resetError()),
  signIn: (data) => dispatch(signIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
