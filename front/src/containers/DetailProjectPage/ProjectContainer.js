import { connect } from 'react-redux';
import Project from 'components/DetailProjectPage/Project';

export default connect(
  state => ({ projectData: state.detailProject.get('projectData').toJS() }),
  null,
)(Project);
