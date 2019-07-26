import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToDoContainer from 'containers/DetailProjectPage/TodoContainer';
import ToDoList from 'components/DetailProjectPage/ToDoList';

const ToDoListContainer = ({ toDoData }) => {
  const mapToComponent = () =>
    toDoData.map(toDo => <ToDoContainer data={toDo} key={toDo._id} />);

  return <ToDoList>{mapToComponent()}</ToDoList>;
};

ToDoListContainer.propTypes = {
  toDoData: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    toDoData: state.detailProject.get('toDoData').toJS(),
  }),
  null,
)(ToDoListContainer);
