import React, { useState } from 'react';
import axios from 'axios';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import { useDataFns, TYPE } from 'store/Common/Data';
import { unshift, deleteMany } from 'lib/manuArrData';
import { useOnlyPrivateValues } from 'store/Common/OnlyPrivate';
import ToDo from 'components/DetailProject/ToDo';
import ToDoList from './ToDoList';

const ToDoListContainer = ({ createdAt, data }) => {
  const [toDoList, setToDoList] = useState(data);
  const { deleteOneData } = useDataFns();
  const { isEditMode, isMultiMode } = useEditMenuValues();
  const { setEditMode, toggleMultiMode, initMode } = useEditMenuFns();
  const { selectedProjectId } = useOnlyPrivateValues();
  const createToDo = titleRef => {
    if (!titleRef.current || !titleRef.current.value) return;
    const _data = {
      title: titleRef.current.value,
    };
    axios({
      url: `/me/toDo/create/${selectedProjectId}`,
      method: 'post',
      data: _data,
    }).then(res => {
      setToDoList(unshift(res.data));
      titleRef.current.value = '';
    });
  };
  const deleteToDoList = () => {
    if (!window.confirm(`${createdAt} 정말로 삭제하시겠습니까?`)) return;
    axios({
      url: `/me/toDo/delete`,
      method: 'DELETE',
      data: data.map(_data => _data._id),
    }).then(() => {
      deleteOneData({ type: TYPE.DETAIL_PROJECT, id: createdAt });
    });
  };
  return (
    <ToDoList
      createdAt={createdAt}
      deleteToDoList={deleteToDoList}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      setEditMode={setEditMode}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
      createToDo={createToDo}
    >
      {toDoList.map(toDo => (
        <ToDo
          id={toDo._id}
          key={toDo._id}
          data={toDo}
          setToDoList={setToDoList}
        />
      ))}
    </ToDoList>
  );
};
export default ToDoListContainer;
