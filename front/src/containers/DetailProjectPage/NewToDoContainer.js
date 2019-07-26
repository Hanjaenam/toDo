import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createToDo,
  setIsNewToDo,
  setToDoDataTemplate,
  initToDoDataTemplate,
} from 'store/modules/detailProject';
import NewToDo from 'components/DetailProjectPage/NewToDo';

const NewToDoContainer = ({ initToDoDataTemplate, ...rest }) => {
  useEffect(() => {
    initToDoDataTemplate();
  }, []);
  return <NewToDo {...rest} />;
};

NewToDoContainer.propTypes = {
  initToDoDataTemplate: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    projectId: state.detailProject.getIn(['projectData', '_id']),
    toDoDataTemplate: state.detailProject.get('dataTemplate').toJS(),
  }),
  dispatch => ({
    createToDo: ({ projectId, title, memo, importance, order }) =>
      dispatch(createToDo({ projectId, title, memo, importance, order })),
    setIsNewToDo: isNewToDo => dispatch(setIsNewToDo(isNewToDo)),
    setToDoDataTemplate: ({ type, value }) =>
      dispatch(setToDoDataTemplate({ type, value })),
    initToDoDataTemplate: () => dispatch(initToDoDataTemplate()),
  }),
)(NewToDoContainer);
