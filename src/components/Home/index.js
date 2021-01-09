import { connect } from 'react-redux';

import { fetchCookie, logOut, verifyToken } from '../../redux/slices/authentications';
import Home from './Home';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading,
  isError: state.authenticationsReducer.isError,
  error: state.authenticationsReducer.error,
  authToken: state.authenticationsReducer.authToken,
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCookie: (data) => dispatch(fetchCookie(data)),
  logOut: (data) => dispatch(logOut(data)),
  verifyToken: (data) => dispatch(verifyToken(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
