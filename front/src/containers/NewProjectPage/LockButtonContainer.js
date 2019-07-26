import { connect } from 'react-redux';
import { setProjectDataTemplate } from 'store/modules/detailProject';
import LockButton from 'components/NewProjectPage/LockButton';

export default connect(
  state => ({
    isPublic: state.detailProject.getIn(['dataTemplate', 'isPublic']),
  }),
  dispatch => ({
    setProjectDataTemplate: ({ type, value }) =>
      dispatch(setProjectDataTemplate({ type, value })),
  }),
)(LockButton);
