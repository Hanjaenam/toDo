import { connect } from 'react-redux';
import { logOut } from 'store/modules/user';
import Header from 'components/Common/Header';

export default connect(
  null,
  dispatch => ({
    logOut: () => dispatch(logOut()),
  }),
)(Header);
