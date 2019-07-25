import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readAllProject } from 'store/modules/projectList';
import Project from 'components/ProjectListPage/Project';
import ProjectList from 'components/ProjectListPage/ProjectList';

const ProjectListContainer = ({
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
      <Project data={projectData} key={projectData._id} />
    ));

  return readLoading === false ? (
    <ProjectList>{mapToComponent()}</ProjectList>
  ) : null;
};

ProjectListContainer.propTypes = {
  readLoading: PropTypes.bool,
  projectListData: PropTypes.array.isRequired,
  readAllProject: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

ProjectListContainer.defaultProps = {
  readLoading: undefined,
};

export default connect(
  state => ({
    projectListData: state.projectList.get('data').toJS(),
    readLoading: state.pender.pending['projectList/READ_ALL_PROJECT'],
  }),
  dispatch => ({
    readAllProject: ({ query }) => dispatch(readAllProject({ query })),
  }),
)(ProjectListContainer);
