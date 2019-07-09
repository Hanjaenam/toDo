import React from 'react';
import axios from 'axios';
import { useListEditMenuValues } from 'store/Common/ListEditMenu';
import { useProjectListFns } from 'pages/ProjectList';
import { unshift, deleteMany } from 'lib/manuArrData';
import EditProject from './EditProject';

const EditProjectContainer = () => {
  const { idsToDelete } = useListEditMenuValues();
  const { setProjectList } = useProjectListFns();
  const createProject = titleRef => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    axios({
      url: '/me/project/create',
      method: 'post',
      data: {
        title: titleRef.current.value,
      },
    })
      .then(res => {
        setProjectList(unshift(res.data));
      })
      .finally(() => {
        titleRef.current.value = '';
      });
  };
  const handleDeleteMany = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    axios({
      url: '/me/project/delete',
      method: 'DELETE',
      data: idsToDelete,
    }).then(() => {
      setProjectList(deleteMany(idsToDelete));
    });
  };
  return (
    <EditProject
      createProject={createProject}
      handleDeleteMany={handleDeleteMany}
    />
  );
};
export default EditProjectContainer;
