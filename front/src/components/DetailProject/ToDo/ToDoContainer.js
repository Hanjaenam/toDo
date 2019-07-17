import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import { deleteOne, patch } from 'lib/manuArrData';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import axios from 'axios';
import { useToDoListFns } from 'components/DetailProject/ToDoList/ToDoListContainer';
import ToDo from './ToDo';

const ToDoContainer = ({ data, edit }) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { addOrRemoveIdToDelete, isSelected } = useListEditMenuFns();
  const { titleChangeMode, showToDoMemo } = useEditMenuValues();
  const { setTitleChangeMode, toggleShowToDoMemo } = useEditMenuFns();
  const { setToDoList } = useToDoListFns();
  const handleClick = e => {
    if (!edit && !isEditMode) {
      const msg = data.isCompleted
        ? '완료를 취소하시겠습니까?'
        : '완료하시겠습니까?';
      if (!window.confirm(msg)) return;
      axios({
        url: `/me/toDo/patch/${data._id}`,
        method: 'patch',
        data: {
          isCompleted: !data.isCompleted,
        },
      }).then(res => {
        setToDoList(patch(data._id, res.data));
      });
    } else if (isMultiMode) {
      addOrRemoveIdToDelete(data._id);
    }
  };
  const deleteToDo = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    if (edit) {
      setToDoList(deleteOne(data._id));
    } else {
      axios({
        url: `/me/toDo/delete/${data._id}`,
        method: 'delete',
      }).then(() => {
        setToDoList(deleteOne(data._id));
      });
    }
  };
  const patchToDo = titleRef => {
    if (data.title === titleRef.current.value) return;
    const _data = { title: titleRef.current.value };
    if (edit) {
      setToDoList(patch(data._id, _data));
      setTitleChangeMode(false);
    } else {
      axios({
        url: `/me/toDo/patch/${data._id}`,
        method: 'patch',
        data: _data,
      })
        .then(res => {
          setToDoList(patch(data._id, res.data));
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
      isSelected={isSelected(data._id)}
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
  data: PropTypes.shape({}).isRequired,
  edit: PropTypes.bool,
};
ToDoContainer.defaultProps = {
  edit: undefined,
};
export default ToDoContainer;
