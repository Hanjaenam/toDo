import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useProjectListFns } from 'store/ProjectList';
import Project from './Project';

const ProjectContainer = ({ id, title, createdAt, history }) => {
  const [isChangeTitleMode, setChangeTitleMode] = useState(false);
  const { idsToDelete, isEditMode, isMultiMode } = useEditMenuValues();
  const { toggleIdsToDelete } = useEditMenuFns();
  const { deleteOneProject, patchProject } = useProjectListFns();
  useEffect(() => {
    if (!isEditMode && isChangeTitleMode) {
      setChangeTitleMode(false);
    }
  }, [isEditMode]);
  const handleDelete = id => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios({
        url: `/me/project/delete/${id}`,
        method: 'delete',
      }).then(() => {
        deleteOneProject(id);
      });
    }
  };
  const processPatch = titleRef => {
    if (!titleRef.current) return;
    const newTitle = titleRef.current.value;
    if (title === newTitle) return;
    axios({
      url: `/me/project/patch/${id}`,
      method: 'patch',
      data: {
        title: newTitle,
      },
    })
      .then(res => {
        patchProject({ id, patchedData: res.data });
      })
      .finally(() => {
        setChangeTitleMode(false);
      });
  };
  const handleClick = e => {
    if (!isEditMode) {
      history.push(`/me/project/${id}`);
    } else if (isMultiMode) {
      toggleIdsToDelete(id);
    }
  };
  const handlePatchKeyUp = (e, titleRef) => {
    if (e.keyCode === 13) {
      processPatch(titleRef);
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
      processPatch={processPatch}
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
