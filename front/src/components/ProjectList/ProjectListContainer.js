import React from 'react';
import EditProject from 'components/ProjectList/EditProject';
import { useDataFns } from 'store/Common/Data';
import EditMenuProvider from 'store/Common/EditMenu';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  const { mapToComponent } = useDataFns();
  return (
    <EditMenuProvider>
      <ProjectList EditProject={<EditProject />}>
        {mapToComponent({ type: 'projectList' })}
      </ProjectList>
    </EditMenuProvider>
  );
};
export default ProjectListContainer;
