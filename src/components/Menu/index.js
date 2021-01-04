import { connect } from 'react-redux';

import Menu from './Menu';

const mapStateToProps = (state) => ({
  areas: state.areasReducer.areas,
  choosenAreaId: state.areasReducer.choosenAreaId,
});

export default connect(mapStateToProps)(Menu);
