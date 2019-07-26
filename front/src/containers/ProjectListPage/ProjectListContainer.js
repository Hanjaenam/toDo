import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readAllProject as rap } from 'store/modules/projectList';
import ProjectContainer from 'containers/ProjectListPage/ProjectContainer';
import ProjectList from 'components/ProjectListPage/ProjectList';

const ProjectListContainer = ({
  lastPage,
  page,
  projectListData,
  readLoading,
  readAllProject,
  search,
}) => {
  useEffect(() => {
    readAllProject({ query: search });
  }, [search]);

  const mapToComponent = () =>
    projectListData.map(projectData => (
      <ProjectContainer data={projectData} key={projectData._id} />
    ));

  return readLoading === false ? (
    <ProjectList lastPage={lastPage} page={page}>
      {mapToComponent()}
    </ProjectList>
  ) : null;
};

ProjectListContainer.propTypes = {
  lastPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  projectListData: PropTypes.array.isRequired,
  readLoading: PropTypes.bool,
  readAllProject: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

ProjectListContainer.defaultProps = {
  readLoading: undefined,
};

export default connect(
  state => ({
    lastPage: state.projectList.get('lastPage'),
    page: state.projectList.getIn(['query', 'page']),
    projectListData: state.projectList.get('data').toJS(),
    readLoading: state.pender.pending['projectList/READ_ALL_PROJECT'],
  }),
  dispatch => ({
    readAllProject: ({ query }) => dispatch(rap({ query })),
  }),
)(ProjectListContainer);
