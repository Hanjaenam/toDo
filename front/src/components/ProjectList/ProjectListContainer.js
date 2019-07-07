import React from 'react';
import EditProject from 'components/ProjectList/EditProject';
import { useProjectListFns } from 'store/ProjectList';
import EditMenuProvider from 'store/Common/EditMenu';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  const { mapToComponent } = useProjectListFns();
  return (
    <EditMenuProvider>
      <ProjectList EditProject={<EditProject />}>
        {mapToComponent()}
      </ProjectList>
    </EditMenuProvider>
  );
};
export default ProjectListContainer;
