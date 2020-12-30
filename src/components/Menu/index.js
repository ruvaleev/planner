import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import { toggleEditable } from '../../redux/slices/tableOfContents';
import Menu from './Menu';

const mapStateToProps = (state) => ({
  editable: state.tableOfContentsReducer.editable,
})

const mapDispatchToProps = (dispatch) => ({
  toggleEditable: (editable) => dispatch(toggleEditable(editable)),
  undo: () => dispatch(ActionCreators.undo()),
  redo: () => dispatch(ActionCreators.redo())
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
