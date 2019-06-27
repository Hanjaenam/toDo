import React from 'react';
import { useToDoList } from 'components/ToDo/ToDoList/ToDoListContext';
import ToDoList from './ToDoListView';

const ToDOList = () => {
  const dataList = useToDoList();
  return <ToDoList>{dataList}</ToDoList>;
};
export default ToDOList;
