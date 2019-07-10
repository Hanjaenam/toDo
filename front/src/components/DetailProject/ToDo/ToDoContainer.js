import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import { deleteOne, patch } from 'lib/manuArrData';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import axios from 'axios';
import ToDo from './ToDo';

const ToDoContainer = ({ id, data, setToDoList, edit }) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { addOrRemoveIdToDelete, isSelected } = useListEditMenuFns();
  const { titleChangeMode, showToDoMemo } = useEditMenuValues();
  const { setTitleChangeMode, toggleShowToDoMemo } = useEditMenuFns();
  const handleClick = e => {
    if (!edit && !isEditMode) {
      const msg = data.isCompleted
        ? '완료를 취소하시겠습니까?'
        : '완료하시겠습니까?';
      if (!window.confirm(msg)) return;
      axios({
        url: `/me/toDo/patch/${id}`,
        method: 'patch',
        data: {
          isCompleted: !data.isCompleted,
        },
      }).then(res => {
        setToDoList(patch(id, res.data));
      });
    } else if (isMultiMode) {
      addOrRemoveIdToDelete(id);
    }
  };
  const deleteToDo = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    if (edit) {
      setToDoList(deleteOne(id));
    } else {
      axios({
        url: `/me/toDo/delete/${id}`,
        method: 'delete',
      }).then(() => {
        setToDoList(deleteOne(id));
      });
    }
  };
  const patchToDo = titleRef => {
    if (!titleRef.current) return;
    if (data.title === titleRef.current.value) return;
    const _data = { title: titleRef.current.value };
    if (edit) {
      setToDoList(patch(id, _data));
      setTitleChangeMode(false);
    } else {
      axios({
        url: `/me/toDo/patch/${id}`,
        method: 'patch',
        data: _data,
      })
        .then(res => {
          setToDoList(patch(id, res.data));
        })
        .finally(() => {
          setTitleChangeMode(false);
        });
    }
  };
  return (
    <ToDo
      data={data}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={isSelected(id)}
      handleClick={handleClick}
      deleteToDo={deleteToDo}
      patchToDo={patchToDo}
      titleChangeMode={titleChangeMode}
      setTitleChangeMode={setTitleChangeMode}
      showToDoMemo={showToDoMemo}
      toggleShowToDoMemo={toggleShowToDoMemo}
    />
  );
};
ToDoContainer.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  setToDoList: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};
ToDoContainer.defaultProps = {
  edit: undefined,
};
export default ToDoContainer;
