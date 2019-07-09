import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useChangeTitleMode } from 'lib/hooks';
import { useProjectListFns } from 'pages/ProjectList';
import { deleteOne, patch } from 'lib/manuArrData';
import Project from './Project';

const ProjectContainer = ({ id, data, history }) => {
  const { setProjectList } = useProjectListFns();
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { toggleIdsToDelete, isSelected } = useListEditMenuFns();
  const { titleChangeMode, setTitleChangeMode } = useChangeTitleMode({
    isEditMode,
    isMultiMode,
  });

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios({
        url: `/me/project/delete/${id}`,
        method: 'delete',
      }).then(() => {
        setProjectList(deleteOne(id));
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
        setProjectList(patch(id, res.data));
      })
      .finally(() => {
        setTitleChangeMode(false);
      });
  };
  const handleClick = e => {
    if (!isEditMode) {
      history.push(`/me/project/${data._id}`);
    } else if (isMultiMode) {
      toggleIdsToDelete(id);
    }
  };
  return (
    <Project
      data={data}
      handleDelete={handleDelete}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={isSelected(id)}
      titleChangeMode={titleChangeMode}
      setTitleChangeMode={setTitleChangeMode}
      processPatch={processPatch}
      handleClick={handleClick}
    />
  );
};

ProjectContainer.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    // createdAt: PropTypes.string.isRequired,
    // isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
};
export default withRouter(ProjectContainer);
