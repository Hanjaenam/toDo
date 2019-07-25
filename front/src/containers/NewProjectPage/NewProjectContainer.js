import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from 'store/modules/detailProject';
import NewProject from 'components/NewProjectPage/NewProject';

export default connect(
  state => ({
    projectData: state.detailProject.get('data').toJS(),
    createSuccess: state.pender.success['project/CREATE_PROJECT'],
  }),
  dispatch => ({
    ProjectActions: bindActionCreators(projectActions, dispatch),
  }),
)(NewProject);
