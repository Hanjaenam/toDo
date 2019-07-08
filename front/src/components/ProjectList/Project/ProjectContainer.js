import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDataFns } from 'store/Common/Data';
import { useOnlyPrivatefns } from 'store/Common/OnlyPrivate';
import moment from 'moment';
import Project from './Project';

const ProjectContainer = ({ id, data, history }) => {
  const [isChangeTitleMode, setChangeTitleMode] = useState(false);
  const { isEditMode, isMultiMode } = useEditMenuValues();
  const { toggleIdsToDelete, isSelected } = useEditMenuFns();
  const { deleteOneData, patchData } = useDataFns();
  const { setProjectId } = useOnlyPrivatefns();
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
        deleteOneData({ type: 'projectList', id });
      });
    }
  };
  const processPatch = titleRef => {
    if (!titleRef.current) return;
    const newTitle = titleRef.current.value;
    if (data.title === newTitle) return;
    axios({
      url: `/me/project/patch/${id}`,
      method: 'patch',
      data: {
        title: newTitle,
      },
    })
      .then(res => {
        patchData({ type: 'projectList', id, patchedData: res.data });
      })
      .finally(() => {
        setChangeTitleMode(false);
      });
  };
  const handleClick = e => {
    if (!isEditMode) {
      setProjectId(id);
      history.push(`/me/project/${data.title}`);
    } else if (isMultiMode) {
      toggleIdsToDelete(id);
    }
  };
  return (
    <Project
      id={id}
      data={data}
      handleDelete={handleDelete}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={isSelected(id)}
      isChangeTitleMode={isChangeTitleMode}
      setChangeTitleMode={setChangeTitleMode}
      processPatch={processPatch}
      handleClick={handleClick}
    />
  );
};

ProjectContainer.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
};
export default withRouter(ProjectContainer);
