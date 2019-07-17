import React from 'react';
import { patch } from 'lib/manuArrData';
import { useProjectListFns } from 'store/ProjectList';
import { API_PatchProject } from 'lib/API';
import EditImportance from './EditImportance';

const EditImportanceContainer = ({ id, isEditMode, importance }) => {
  const { setProjectList } = useProjectListFns();
  const patchProject = changeImportance => {
    if (importance === changeImportance) return;
    API_PatchProject({
      id,
      data: {
        importance: changeImportance,
      },
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
