import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { useProjectFns, useProjectValue } from 'store/Project';
import {
  useAddProjectValue,
  useFns as useAddProjectFns,
} from 'store/ProjectList/AddProject';
import AddProject from './AddProject';

const AddProjectContainer = () => {
  const { toDeleteIds } = useProjectValue();
  const { unshiftData, clearSelectedList, deleteManyData } = useProjectFns();
  const { isEditMode, isMultiMode } = useAddProjectValue();
  const { toggleEditMode, toggleMultiMode, initMode } = useAddProjectFns();
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
  const initialize = () => {
    initMode();
    clearSelectedList();
  };
  const handleDeleteMany = () => {
    if (toDeleteIds.length === 0) return;
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios({
        url: '/project/deleteMany',
        method: 'DELETE',
        data: toDeleteIds,
      }).then(() => {
        deleteManyData({ idList: toDeleteIds, type: 'project' });
      });
    }
  };
  return (
    <AddProject
      titleRef={titleRef}
      addToDo={addToDo}
      handleAddKeyUp={handleAddKeyUp}
      isEditMode={isEditMode}
      toggleEditMode={toggleEditMode}
      isMultiMode={isMultiMode}
      toggleMultiMode={toggleMultiMode}
      initialize={initialize}
      handleDeleteMany={handleDeleteMany}
    />
  );
};
export default AddProjectContainer;
