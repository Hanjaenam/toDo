import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useProjectFns, useProjectValue } from 'store/Project';
// import { useFns as useDetailProjectFns } from 'store/Project/DetailProject';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useAddProjectValue } from 'store/ProjectList/AddProject';
import Project from './Project';

const ProjectContainer = ({ id, title, createdAt, history }) => {
  const [changeTitle, setChangeTitleMode] = useState(false);
  const { toDeleteIds } = useProjectValue();
  const {
    deleteOneData,
    patchData,
    toggleToDeleteId,
    selectProject,
  } = useProjectFns();
  // const { loadData } = useDetailProjectFns();
  const { isEditMode, isMultiMode } = useAddProjectValue();
  const handleDelete = id => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios({
        url: `/project/delete/${id}`,
        method: 'delete',
      }).then(() => {
        deleteOneData({ id, type: 'project' });
      });
    }
  };
  const patchProject = titleRef => {
    if (!titleRef.current) return;
    const newTitle = titleRef.current.value;
    if (title === newTitle) return;
    axios({
      url: `/project/patch/${id}`,
      method: 'patch',
      data: {
        title: newTitle,
      },
    })
      .then(res => {
        patchData({ id, newData: res.data, type: 'project' });
      })
      .finally(() => {
        setChangeTitleMode(false);
      });
  };
  const handleClick = e => {
    if (!isEditMode) {
      selectProject(id);
      history.push(`/project/${title}`);
    } else if (isMultiMode) {
      toggleToDeleteId(id);
    }
  };
  const handlePatchKeyUp = (e, titleRef) => {
    if (e.keyCode === 13) {
      patchProject(titleRef);
    }
  };
  return (
    <Project
      id={id}
      title={title}
      createdAt={createdAt}
      handleDelete={handleDelete}
      changeTitle={changeTitle}
      setChangeTitleMode={setChangeTitleMode}
      patchProject={patchProject}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      handleClick={handleClick}
      isSelected={toDeleteIds.some(selectedId => selectedId === id)}
      handlePatchKeyUp={handlePatchKeyUp}
    />
  );
};

ProjectContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
export default withRouter(ProjectContainer);
