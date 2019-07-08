import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { useDataFns } from 'store/Common/Data';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import EditProject from './EditProject';

const EditProjectContainer = () => {
  const { idsToDelete, isEditMode, isMultiMode } = useEditMenuValues();
  const { setEditMode, toggleMultiMode, initMode } = useEditMenuFns();
  const { unshiftData, deleteManyData } = useDataFns();
  const titleRef = useRef();
  const createProject = () => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    axios({
      url: '/me/project/create',
      method: 'post',
      data: {
        title: titleRef.current.value,
      },
    })
      .then(res => {
        unshiftData({ type: 'projectList', data: res.data });
      })
      .finally(() => {
        titleRef.current.value = '';
      });
  };
  const handleCreateKeyUp = event => {
    if (event.keyCode === 13) {
      createProject();
    }
  };
  const handleDeleteMany = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    axios({
      url: '/me/project/delete',
      method: 'DELETE',
      data: idsToDelete,
    }).then(() => {
      deleteManyData({ type: 'projectList', idList: idsToDelete });
    });
  };
  return (
    <EditProject
      titleRef={titleRef}
      createProject={createProject}
      handleCreateKeyUp={handleCreateKeyUp}
      isEditMode={isEditMode}
      setEditMode={setEditMode}
      isMultiMode={isMultiMode}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
      handleDeleteMany={handleDeleteMany}
    />
  );
};
export default EditProjectContainer;
