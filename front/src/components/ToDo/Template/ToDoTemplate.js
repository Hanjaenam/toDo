import React from 'react';
import ToDoListProvider from 'components/ToDo/ToDoList/ToDoListContext';
import ToDoList from 'components/ToDo/ToDoList';

const ToDoTemplate = () => (
  <ToDoListProvider>
    <ToDoList />
  </ToDoListProvider>
);
export default ToDoTemplate;
