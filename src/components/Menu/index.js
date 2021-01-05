import { connect } from 'react-redux';

import Menu from './Menu';
import { createArea, chooseArea } from '../../redux/slices/areas';

const mapStateToProps = (state) => ({
  areas: state.areasReducer.areas,
});

const mapDispatchToProps = (dispatch) => ({
  createArea: (data) => dispatch(createArea(data)),
  chooseArea: (data) => dispatch(chooseArea(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
