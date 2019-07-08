import React, { useState, useEffect } from 'react';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import { deleteOne, patch } from 'lib/manuArrData';
import axios from 'axios';
import ToDo from './ToDo';

const ToDoContainer = ({ id, data, setToDoList, edit }) => {
  const [isChangeTitleMode, setChangeTitleMode] = useState(false);
  const { isEditMode, isMultiMode } = useEditMenuValues();
  const { toggleIdsToDelete, isSelected } = useEditMenuFns();
  useEffect(() => {
    if (!isEditMode && isChangeTitleMode) {
      setChangeTitleMode(false);
    }
  }, [isEditMode]);
  const handleClick = e => {
    if (!isEditMode) {
      if (!window.confirm('완료하시겠습니까?')) return;
      axios({
        url: `/me/toDo/complete/${id}`,
        method: 'patch',
        data: {
          isCompleted: true,
        },
      }).then(res => {
        setToDoList(patch(id, res.data));
      });
    } else if (isMultiMode) {
      toggleIdsToDelete(id);
    }
  };
  const cancelComplete = () => {
    if (data.isCompleted) return;
    if (!window.confirm('완료를 취소하시겠습니까?')) return;
    axios({
      url: `/me/toDo/complete/${id}`,
      method: 'patch',
      data: {
        isCompleted: true,
      },
    }).then(res => {
      setToDoList(patch(id, res.data));
    });
  };
  const handleDelete = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    if (edit) {
      setToDoList(deleteOne(id));
      return;
    }
    axios({
      url: `/me/toDo/delete/${id}`,
      method: 'delete',
    }).then(res => {
      if (res.status === 204) {
        setToDoList(deleteOne(id));
      }
    });
  };
  const processPatch = titleRef => {
    if (!titleRef.current) return;
    const patchedData = { title: titleRef.current.value };
    if (edit) {
      setToDoList(patch(id, patchedData));
      setChangeTitleMode(false);
      return;
    }
    axios({
      url: `/me/toDo/patch/${id}`,
      method: 'patch',
      data: patchedData,
    }).then(res => {
      setToDoList(patch(id, res.data));
      setChangeTitleMode(false);
    });
  };
  return (
    <ToDo
      data={data}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={isSelected(id)}
      isChangeTitleMode={isChangeTitleMode}
      setChangeTitleMode={setChangeTitleMode}
      handleClick={handleClick}
      handleDelete={handleDelete}
      processPatch={processPatch}
      cancelComplete={cancelComplete}
    />
  );
};
export default ToDoContainer;
