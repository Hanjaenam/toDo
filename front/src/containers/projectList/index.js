import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Project from 'components/ProjectList/Project';
import ProjectList from 'components/ProjectList';
import * as projectListActions from 'store/modules/projectList';

const ProjectListContainer = ({
  loading,
  projectList,
  ProjectListActions: { readAllProject },
  locationSearch,
}) => {
  useEffect(() => {
    readAllProject({ query: locationSearch });
  }, [locationSearch]);
  const mapToComponent = () =>
    projectList.map(project => <Project data={project} key={project._id} />);
  return loading === false ? (
    <ProjectList>{mapToComponent()}</ProjectList>
  ) : null;
};

export default connect(
  state => ({
    projectList: state.projectList.get('data').toJS(),
    loading: state.pender.pending['projectList/READ_ALL_PROJECT'],
  }),
  dispatch => ({
    ProjectListActions: bindActionCreators(projectListActions, dispatch),
  }),
)(ProjectListContainer);
