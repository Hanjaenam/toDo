import { connect } from 'react-redux';
import Header from 'components/common/Header';
import { logOut } from 'store/modules/user';

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    logOut: () => dispatch(logOut()),
  }),
)(Header);
