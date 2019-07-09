import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import { deleteOne, patch } from 'lib/manuArrData';
import axios from 'axios';
import { useChangeTitleMode } from 'lib/hooks';
import ToDo from './ToDo';

const ToDoContainer = ({ id, data, setToDoList, edit }) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { toggleIdsToDelete, isSelected } = useListEditMenuFns();
  const { titleChangeMode, setTitleChangeMode } = useChangeTitleMode({
    isEditMode,
    isMultiMode,
  });
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
      toggleIdsToDelete(id);
    }
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
      setTitleChangeMode(false);
      return;
    }
    axios({
      url: `/me/toDo/patch/${id}`,
      method: 'patch',
      data: patchedData,
    }).then(res => {
      setToDoList(patch(id, res.data));
      setTitleChangeMode(false);
    });
  };
  return (
    <ToDo
      data={data}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={isSelected(id)}
      handleClick={handleClick}
      handleDelete={handleDelete}
      processPatch={processPatch}
      titleChangeMode={titleChangeMode}
      setTitleChangeMode={setTitleChangeMode}
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
