import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import { withRouter } from 'react-router-dom';
import { useProjectListFns } from 'pages/ProjectList';
import { unshift, deleteOne, deleteMany, patch } from 'lib/manuArrData';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import axios from 'axios';
import Project from './Project';

const ProjectContainer = ({ id, edit, data, history }) => {
  const { setProjectList } = useProjectListFns();
  const { isEditMode, isMultiMode, idsToDelete } = useListEditMenuValues();
  const { addOrRemoveIdToDelete, isSelected } = useListEditMenuFns();
  const { titleChangeMode } = useEditMenuValues();
  const { setTitleChangeMode } = useEditMenuFns();
  const createProject = titleRef => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    axios({
      url: '/me/project/create',
      method: 'post',
      data: { title: titleRef.current.value },
    })
      .then(res => {
        setProjectList(unshift(res.data));
      })
      .finally(() => {
        titleRef.current.value = '';
      });
  };
  const deleteProject = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    axios({
      url: `/me/project/delete/${id}`,
      method: 'delete',
      setState: setProjectList,
      id,
    }).then(() => {
      setProjectList(deleteOne(id));
    });
  };
  const deleteManyProject = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    axios({
      url: `/me/project/delete`,
      method: 'delete',
      data: idsToDelete,
    }).then(() => {
      setProjectList(deleteMany(idsToDelete));
    });
  };
  const patchProject = titleRef => {
    if (!titleRef.current) return;
    if (data.title === titleRef.current.value) return;
    axios({
      url: `/me/project/patch/${id}`,
      method: 'patch',
      data: { title: titleRef.current.value },
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
      addOrRemoveIdToDelete(id);
    }
  };
  return (
    <Project
      edit={edit}
      data={data}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={isSelected(id)}
      titleChangeMode={titleChangeMode}
      setTitleChangeMode={setTitleChangeMode}
      createProject={createProject}
      deleteProject={deleteProject}
      deleteManyProject={deleteManyProject}
      patchProject={patchProject}
      handleClick={handleClick}
    />
  );
};

ProjectContainer.propTypes = {
  id: PropTypes.string,
  edit: PropTypes.bool,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
};

ProjectContainer.defaultProps = {
  id: undefined,
  edit: undefined,
  data: undefined,
};
export default withRouter(ProjectContainer);
