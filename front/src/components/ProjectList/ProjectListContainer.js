import React from 'react';
import EditProject from 'components/ProjectList/EditProject';
import { useProjectFns } from 'store/Project';
import EditMenuProvider from 'store/Common/EditMenu';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  const { mapToComponent } = useProjectFns();
  return (
    <EditMenuProvider>
      <ProjectList EditProject={<EditProject />}>
        {mapToComponent()}
      </ProjectList>
    </EditMenuProvider>
  );
};
export default ProjectListContainer;
