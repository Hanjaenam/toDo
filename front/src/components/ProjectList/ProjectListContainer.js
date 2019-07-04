import React from 'react';
import AddProject from 'components/ProjectList/AddProject';
import AddCardProvider from 'store/ProjectList/AddProject';
import { useProjectFns } from 'store/Project';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  const { mapToComponent } = useProjectFns();
  return (
    <ProjectList>
      <AddCardProvider>
        <AddProject />
        {mapToComponent({ type: 'project' })}
      </AddCardProvider>
    </ProjectList>
  );
};
export default ProjectListContainer;
