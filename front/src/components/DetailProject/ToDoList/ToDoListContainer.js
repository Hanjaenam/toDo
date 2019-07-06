import React from 'react';
import axios from 'axios';
import ToDoList from './ToDoList';

const ToDoListContainer = ({ id, createdAt }) => {
  const deleteToDoList = () => {
    if (!window.confirm(`${createdAt} 정말로 삭제하시겠습니까?`)) return;
    axios({ url: `/toDoList/delete/${id}`, method: 'DELETE' }).then(() => {
      deleteOneData({ id, type: 'toDoList' });
    });
  };
  return <ToDoList createdAt={createdAt} deleteToDoList={deleteToDoList} />;
};
export default ToDoListContainer;
