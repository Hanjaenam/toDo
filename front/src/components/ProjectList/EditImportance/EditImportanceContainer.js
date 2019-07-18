import React from 'react';
import { patch } from 'lib/manuArrData';
import { useProjectListFns } from 'store/ProjectList';
import { projectAPI } from 'lib/API';
import EditImportance from './EditImportance';

const EditImportanceContainer = ({ id, importance }) => {
  const { setProjectList } = useProjectListFns();
  const patchProject = changeImportance => {
    if (importance === changeImportance) return;
    projectAPI
      .patch({
        id,
        data: {
          importance: changeImportance,
        },
      })
      .then(res => {
        setProjectList(patch(id, res.data));
      });
  };
  return <EditImportance patchProject={patchProject} importance={importance} />;
};
export default EditImportanceContainer;
