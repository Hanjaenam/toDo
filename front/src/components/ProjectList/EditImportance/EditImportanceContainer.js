import React from 'react';
import axios from 'axios';
import { patch } from 'lib/manuArrData';
import { useProjectListFns } from 'pages/ProjectList';
import EditImportance from './EditImportance';

const EditImportanceContainer = ({ id, isEditMode, importance }) => {
  const { setProjectList } = useProjectListFns();
  const patchProject = changeImportance => {
    console.log(changeImportance);
    if (importance === changeImportance) return;
    axios({
      url: `/me/project/patch/${id}`,
      method: 'patch',
      data: { importance: changeImportance },
    }).then(res => {
      setProjectList(patch(id, res.data));
    });
  };
  return (
    <EditImportance
      isEditMode={isEditMode}
      patchProject={patchProject}
      importance={importance}
    />
  );
};
export default EditImportanceContainer;
