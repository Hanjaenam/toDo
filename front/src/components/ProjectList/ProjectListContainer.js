import React from 'react';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import { useProjectListValues } from 'store/ProjectList';
import Project from 'components/ProjectList/Project';
import EditMenuProvider from 'store/Common/EditMenu';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  const { projectList, searchProject } = useProjectListValues();
  const mapToComponent = () => {
    const { regex, result } = searchProject;
    return (regex === '' ? projectList : result).map(project => (
      <EditMenuProvider key={project._id}>
        {/* <Project id={project._id} data={project} /> */}
        <Project data={project} />
      </EditMenuProvider>
    ));
  };

  return (
    <ListEditMenuProvider>
      <ProjectList>{mapToComponent()}</ProjectList>
    </ListEditMenuProvider>
  );
};

export default ProjectListContainer;
