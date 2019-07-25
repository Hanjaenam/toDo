import { connect } from 'react-redux';
import { setProjectData } from 'store/modules/detailProject';
import LockButton from 'components/NewProjectPage/LockButton';

export default connect(
  state => ({ isPublic: state.detailProject.getIn(['data', 'isPublic']) }),
  dispatch => ({
    setProjectData: ({ type, value }) =>
      dispatch(setProjectData({ type, value })),
  }),
)(LockButton);
