import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFns, useSelectedIdList } from 'store/ProjectList/ProjectList';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useValue } from 'store/ProjectList/AddProject';
import Project from './Project';

const ProjectContainer = ({ id, title, createdAt, history }) => {
  const [changeTitle, setChangeTitleMode] = useState(false);
  const selectedIdList = useSelectedIdList();
  const { deleteOneData, patchData, setSelectedId } = useFns();
  const { isEditMode, isMultiMode } = useValue();
  const handleDelete = id => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios({
        url: `/project/delete/${id}`,
        method: 'delete',
      }).then(() => {
        deleteOneData(id);
      });
    }
  };
  const handlePatch = titleRef => {
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
        patchData(id, res.data);
      })
      .finally(() => {
        setChangeTitleMode(false);
      });
  };
  const handleClick = e => {
    if (!isEditMode) {
      history.push(`/project/${title}`);
    } else if (isMultiMode) {
      setSelectedId(id);
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
      handlePatch={handlePatch}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      setSelectedId={setSelectedId}
      handleClick={handleClick}
      isSelected={selectedIdList.some(selectedId => selectedId === id)}
    />
  );
};

ProjectContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
export default withRouter(ProjectContainer);
