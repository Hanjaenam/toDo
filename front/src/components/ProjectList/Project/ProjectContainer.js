import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useProjectFns } from 'store/Project';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Project from './Project';

const ProjectContainer = ({ id, title, createdAt, history }) => {
  const [isChangeTitleMode, setChangeTitleMode] = useState(false);
  const { idsToDelete, isEditMode, isMultiMode } = useEditMenuValues();
  const { toggleIdsToDelete } = useEditMenuFns();
  const { deleteOneData, patchData, selectProject } = useProjectFns();
  useEffect(() => {
    if (!isEditMode && isChangeTitleMode) {
      setChangeTitleMode(false);
    }
  }, [isEditMode]);
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
      toggleIdsToDelete(id);
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
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={idsToDelete.some(selectedId => selectedId === id)}
      isChangeTitleMode={isChangeTitleMode}
      setChangeTitleMode={setChangeTitleMode}
      patchProject={patchProject}
      handleClick={handleClick}
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
