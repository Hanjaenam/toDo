import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { useProjectFns } from 'store/Project';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import AddProject from './EditProject';

const AddProjectContainer = () => {
  const { idsToDelete, isEditMode, isMultiMode } = useEditMenuValues();
  const { setEditMode, toggleMultiMode, initMode } = useEditMenuFns();
  const { unshiftData, deleteManyData } = useProjectFns();
  const titleRef = useRef();
  const addToDo = () => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    axios({
      url: '/project/create',
      method: 'post',
      data: {
        title: titleRef.current.value,
      },
    })
      .then(res => {
        unshiftData({ data: res.data, type: 'project' });
      })
      .finally(() => {
        titleRef.current.value = '';
      });
  };
  const handleAddKeyUp = event => {
    if (event.keyCode === 13) {
      addToDo();
    }
  };
  const handleDeleteMany = () => {
    if (idsToDelete.length === 0) return;
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios({
        url: '/project/deleteMany',
        method: 'DELETE',
        data: idsToDelete,
      }).then(() => {
        deleteManyData({ idList: idsToDelete, type: 'project' });
      });
    }
  };
  return (
    <AddProject
      titleRef={titleRef}
      addToDo={addToDo}
      handleAddKeyUp={handleAddKeyUp}
      isEditMode={isEditMode}
      setEditMode={setEditMode}
      isMultiMode={isMultiMode}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
      handleDeleteMany={handleDeleteMany}
    />
  );
};
export default AddProjectContainer;
