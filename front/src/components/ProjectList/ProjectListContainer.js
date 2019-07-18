import React from 'react';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import { useProjectListValues } from 'store/ProjectList';
import Project from 'components/ProjectList/Project';
import EditMenuProvider from 'store/Common/EditMenu';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  const { projectList } = useProjectListValues();
  const mapToComponent = () =>
    projectList.map(project => (
      <EditMenuProvider key={project._id}>
        <Project data={project} />
      </EditMenuProvider>
    ));

  return (
    <ListEditMenuProvider>
      <ProjectList searchResult={mapToComponent()}>
        {mapToComponent()}
      </ProjectList>
    </ListEditMenuProvider>
  );
};

export default ProjectListContainer;
