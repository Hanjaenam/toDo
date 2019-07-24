import { connect } from 'react-redux';
import { setSort } from 'store/modules/projectList';
import SortView from 'components/ProjectList/SortView';

export default connect(
  state => ({
    sort: state.projectList.getIn(['query', 'sort']),
  }),
  dispatch => ({
    setSort: sort => dispatch(setSort(sort)),
  }),
)(SortView);
