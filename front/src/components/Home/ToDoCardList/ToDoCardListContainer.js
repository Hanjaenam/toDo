import React from 'react';
import { useToDoList } from 'components/Home/ToDoCardList/ToDoCardListContext';
import ToDoCardList from './ToDoCardList';

const ToDoCardListContainer = () => {
  const dataList = useToDoList();
  return <ToDoCardList>{dataList}</ToDoCardList>;
};
export default ToDoCardListContainer;
