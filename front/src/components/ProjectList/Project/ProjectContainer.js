import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import { withRouter } from 'react-router-dom';
import { useProjectListFns } from 'store/ProjectList';
import { deleteOne, patch } from 'lib/manuArrData';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import { projectAPI } from 'lib/API';
import Project from './Project';

const ProjectContainer = ({ data, history }) => {
  const { setProjectList } = useProjectListFns();
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { addOrRemoveIdToDelete } = useListEditMenuFns();
  const { titleChangeMode } = useEditMenuValues();
  const { setTitleChangeMode } = useEditMenuFns();

  const deleteProject = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    projectAPI
      .delete({
        id: data._id,
      })
      .then(() => {
        setProjectList(deleteOne(data._id));
      });
  };

  const patchProject = titleRef => {
    if (data.title === titleRef.current.value) return;
    projectAPI
      .patch({
        id: data._id,
        data: { title: titleRef.current.value },
      })
      .then(res => {
        setProjectList(patch(data._id, res.data));
      })
      .finally(() => {
        setTitleChangeMode(false);
      });
  };
  const handleClick = () => {
    if (!isEditMode) {
      history.push(`/me/project/${data._id}`);
    } else if (isMultiMode) {
      addOrRemoveIdToDelete(data._id);
    }
  };
  return (
    <Project
      data={data}
      titleChangeMode={titleChangeMode}
      patchProject={patchProject}
      handleClick={handleClick}
    />
  );
};

ProjectContainer.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
};

ProjectContainer.defaultProps = {
  data: undefined,
};
export default withRouter(ProjectContainer);
