import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import {
  useFns as useToDoCardListFns,
  useSelectedIdList,
} from 'store/ProjectList/ProjectList';
import {
  useValue,
  useFns as useAddProjectFns,
} from 'store/ProjectList/AddProject';
import AddProject from './AddProject';

const AddProjectContainer = () => {
  const { addData, clearSelectedList, deleteManyData } = useToDoCardListFns();
  const selectedIdList = useSelectedIdList();
  const { isEditMode, isMultiMode } = useValue();
  const { toggleEditMode, toggleMultiMode, initMode } = useAddProjectFns();
  const titleRef = useRef();
  const addToDo = () => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    axios({
      url: '/project/add',
      method: 'post',
      data: {
        title: titleRef.current.value,
      },
    })
      .then(res => {
        addData(res.data);
      })
      .finally(() => {
        titleRef.current.value = '';
      });
  };
  const handleEnter = event => {
    if (event.keyCode === 13) {
      addToDo();
    }
  };
  const initialize = () => {
    initMode();
    clearSelectedList();
  };
  const handleDeleteMany = () => {
    if (selectedIdList.length === 0) return;
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios({
        url: '/project/deleteMany',
        method: 'DELETE',
        data: selectedIdList,
      }).then(() => {
        deleteManyData(selectedIdList);
      });
    }
  };
  return (
    <AddProject
      titleRef={titleRef}
      addToDo={addToDo}
      handleEnter={handleEnter}
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
