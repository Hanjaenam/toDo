import { connect } from 'react-redux';
import { setSearch } from 'store/modules/projectList';
import EditProject from 'components/ProjectList/EditProject';

export default connect(
  null,
  dispatch => ({
    setSearch: search => dispatch(setSearch(search)),
  }),
)(EditProject);
