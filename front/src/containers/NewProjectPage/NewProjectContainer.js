import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from 'store/modules/detailProject';
import NewProject from 'components/NewProjectPage/NewProject';

const NewProjectContainer = ({ projectDataTemplate, ProjectActions }) => {
  useEffect(() => {
    ProjectActions.initProjectDataTemplate();
  }, []);
  return (
    <NewProject
      projectDataTemplate={projectDataTemplate}
      ProjectActions={ProjectActions}
    />
  );
};

NewProject.propTypes = {
  projectDataTemplate: PropTypes.shape({
    isPublic: PropTypes.bool.isRequired,
    importance: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  ProjectActions: PropTypes.shape({
    createProject: PropTypes.func.isRequired,
    setProjectDataTemplate: PropTypes.func.isRequired,
    initProjectDataTemplate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  state => ({
    projectDataTemplate: state.detailProject.get('dataTemplate').toJS(),
  }),
  dispatch => ({
    ProjectActions: bindActionCreators(projectActions, dispatch),
  }),
)(NewProjectContainer);
