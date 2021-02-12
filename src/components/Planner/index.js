import { connect } from 'react-redux';

import Planner from './Planner';

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
});

export default connect(mapStateToProps)(Planner);
