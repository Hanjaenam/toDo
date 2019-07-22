import React from 'react';
import { withRouter } from 'react-router-dom';
import EditProject from './EditProject';

const EditProjectContainer = ({ history }) => {
  const createProject = () => {
    history.push('/me/project/create');
  };

  return <EditProject createProject={createProject} />;
};

export default withRouter(EditProjectContainer);
