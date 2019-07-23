import React, { useState } from 'react';
import { projectAPI } from 'lib/API';
import CreateProject from './CreateProject';

const CreateProjectContainer = ({ history }) => {
  const [project, setProject] = useState({
    title: '',
    isPublic: true,
    importance: 1,
  });
  const createProject = () => {
    if (!project.title) return;
    projectAPI.create({ data: project }).then(res => {
      history.replace(`/me/project/${res.data._id}`);
    });
  };
  const cancelCreate = () => {
    history.goBack();
  };
  const handleKeyUp = e => {
    const {
      target: { value: title },
    } = e;
    setProject(s => ({ ...s, title }));
    if (e.keyCode === 13) {
      createProject();
    }
  };
  return (
    <CreateProject
      project={project}
      setProject={setProject}
      handleKeyUp={handleKeyUp}
      createProject={createProject}
      cancelCreate={cancelCreate}
    />
  );
};
export default CreateProjectContainer;
