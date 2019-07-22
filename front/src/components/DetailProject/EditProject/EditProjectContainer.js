import React, { useState } from 'react';
import {
  useDetailProjectValues,
  useDetailProjectFns,
} from 'store/DetailProject';
import EditProject from './EditProject';

const EditProjectContainer = () => {
  const { project } = useDetailProjectValues();
  const { setProject } = useDetailProjectFns();
  const [isEditMode, setEditMode] = useState(false);
  return (
    <EditProject
      project={project}
      isEditMode={isEditMode}
      setEditMode={setEditMode}
      setProject={setProject}
    />
  );
};
export default EditProjectContainer;
