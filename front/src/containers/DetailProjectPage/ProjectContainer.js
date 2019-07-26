import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProjectDataTemplate } from 'store/modules/detailProject';
import { setHoverImportance } from 'store/modules/StarButton';
import Project from 'components/DetailProjectPage/Project';

const ProjectContainer = ({
  projectData,
  setProjectDataTemplate,
  setHoverImportance,
}) => {
  useEffect(() => {
    const { isPublic, importance, title } = projectData;
    setProjectDataTemplate({ type: 'all', isPublic, importance, title });
    setHoverImportance(importance);
  }, []);
  return <Project projectData={projectData} />;
};

export default connect(
  state => ({ projectData: state.detailProject.get('data').toJS() }),
  dispatch => ({
    setProjectDataTemplate: ({ type, isPublic, importance, title }) =>
      dispatch(setProjectDataTemplate({ type, isPublic, importance, title })),
    setHoverImportance: hoverImportance =>
      dispatch(setHoverImportance(hoverImportance)),
  }),
)(ProjectContainer);
