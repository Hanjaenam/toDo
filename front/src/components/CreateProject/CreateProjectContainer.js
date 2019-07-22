import React from 'react';
// import { unshift } from 'lib/manuArrData';
import axios from 'axios';
import { useProjectData } from 'lib/hooks';
import CreateProject from './CreateProject';

const CreateProjectContainer = ({ history }) => {
  const { data, setData } = useProjectData();
  const createProject = () => {
    if (!data.title) return;
    axios({
      url: '/me/project/create',
      method: 'post',
      data,
    }).then(res => {
      history.replace(`/me/project/${res.data._id}`);
    });
  };
  const handleKeyUp = e => {
    const {
      target: { value: title },
    } = e;
    setData(s => ({ ...s, title }));
    if (e.keyCode === 13) {
      createProject();
    }
  };
  const cancelCreate = () => {
    history.goBack();
  };
  return (
    <CreateProject
      data={data}
      setData={setData}
      handleKeyUp={handleKeyUp}
      createProject={createProject}
      cancelCreate={cancelCreate}
    />
  );
};
export default CreateProjectContainer;
