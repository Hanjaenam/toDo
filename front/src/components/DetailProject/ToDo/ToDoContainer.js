import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/DetailProject/ListEditMenu';
import { deleteOne, patch } from 'lib/manuArrData';
import {
  useEditMenuValues,
  useEditMenuFns,
} from 'store/DetailProject/EditMenu';
import { useToDoListFns } from 'store/DetailProject/ToDoList';
import axios from 'axios';
import { useToDoValues, useToDoFns } from 'store/DetailProject/ToDo';
import { toDoAPI } from 'lib/API';
import { usePatchData } from 'lib/hooks';
import ToDo from './ToDo';

const ToDoContainer = ({ edit }) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { addOrRemoveIdToDelete, isSelected } = useListEditMenuFns();
  const { textChangeMode, showToDoMemo } = useEditMenuValues();
  const { setTextChangeMode, toggleShowToDoMemo } = useEditMenuFns();
  const { setToDoList } = useToDoListFns();
  const { toDo } = useToDoValues();
  const { setToDo } = useToDoFns();
  const { patchData, setPatchData } = usePatchData({
    title: toDo.title,
    isPublic: toDo.isPublic,
    importance: toDo.importance,
  });
  useEffect(() => {
    if (!isEditMode) {
      setPatchData({
        title: toDo.title,
        isPublic: toDo.isPublic,
        importance: toDo.importance,
      });
    }
  }, [isEditMode]);
  const completeToDo = () => {
    if (!edit && !isEditMode) {
      const msg = toDo.isCompleted
        ? '완료를 취소하시겠습니까?'
        : '완료하시겠습니까?';
      if (!window.confirm(msg)) return;
      axios({
        url: `/me/toDo/patch/${toDo._id}`,
        method: 'patch',
        data: {
          isCompleted: !toDo.isCompleted,
        },
      }).then(res => {
        setToDoList(patch(toDo._id, res.data));
      });
    } else if (isMultiMode) {
      addOrRemoveIdToDelete(toDo._id);
    }
  };
  const deleteToDo = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    if (edit) {
      setToDoList(deleteOne(toDo._id));
    } else {
      axios({
        url: `/me/toDo/delete/${toDo._id}`,
        method: 'delete',
      }).then(() => {
        setToDoList(deleteOne(toDo._id));
      });
    }
  };
  const patchToDo = () => {
    if (!toDo.title) return;
    if (edit) {
      setToDoList(patch(toDo._id, toDo));
      setTextChangeMode(false);
    } else {
      toDoAPI
        .patch({ id: toDo._id, data: toDo })
        .then(res => setToDoList(patch(toDo._id, res.data)))
        .finally(() => setTextChangeMode(false));
      // axios({
      //   url: `/me/toDo/patch/${toDo._id}`,
      //   method: 'patch',
      //   toDo: _data,
      // })
      //   .then(res => {
      //     setToDoList(patch(toDo._id, res.data));
      //   })
      //   .finally(() => {
      //     setTextChangeMode(false);
      //   });
    }
  };
  return (
    <ToDo
      toDo={toDo}
      patchData={patchData}
      setTitle={title => setPatchData(s => ({ ...s, title }))}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={isSelected(toDo._id)}
      completeToDo={completeToDo}
      deleteToDo={deleteToDo}
      patchToDo={patchToDo}
      textChangeMode={textChangeMode}
      setTextChangeMode={setTextChangeMode}
      showToDoMemo={showToDoMemo}
      toggleShowToDoMemo={toggleShowToDoMemo}
    />
  );
};
ToDoContainer.propTypes = {
  edit: PropTypes.bool,
};
ToDoContainer.defaultProps = {
  edit: undefined,
};
export default ToDoContainer;
