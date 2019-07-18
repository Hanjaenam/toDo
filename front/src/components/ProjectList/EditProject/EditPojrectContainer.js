import React from 'react';
import { useProjectListFns } from 'store/ProjectList';
import { unshift } from 'lib/manuArrData';
import axios from 'axios';
import EditProject from './EditProject';

const EditProjectContainer = () => {
  const { setProjectList } = useProjectListFns();
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

  return <EditProject createProject={createProject} />;
};

export default EditProjectContainer;
