import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProject as cp,
  initProjectDataTemplate as ipdt,
  setProjectDataTemplate as spdt,
} from 'store/modules/projectList';
import NewProject from 'components/NewProjectPage/NewProject';

const NewProjectContainer = ({
  createProject,
  initProjectDataTemplate,
  projectDataTemplate,
  setProjectDataTemplate,
}) => {
  useEffect(() => {
    initProjectDataTemplate();
  }, []);
  return (
    <NewProject
      createProject={createProject}
      projectDataTemplate={projectDataTemplate}
      setProjectDataTemplate={setProjectDataTemplate}
    />
  );
};

NewProjectContainer.propTypes = {
  createProject: PropTypes.func.isRequired,
  initProjectDataTemplate: PropTypes.func.isRequired,
  projectDataTemplate: PropTypes.shape({
    isPublic: PropTypes.bool.isRequired,
    importance: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setProjectDataTemplate: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    projectDataTemplate: state.projectList.get('dataTemplate').toJS(),
  }),
  dispatch => ({
    createProject: ({ title, isPublic, importance }) =>
      dispatch(cp({ title, isPublic, importance })),
    initProjectDataTemplate: () => dispatch(ipdt()),
    setProjectDataTemplate: ({ type, value }) =>
      dispatch(spdt({ type, value })),
  }),
)(NewProjectContainer);
