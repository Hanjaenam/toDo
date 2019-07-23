import React from 'react';
import { useProjectListValues } from 'store/ProjectList';
import Project from 'components/ProjectList/Project';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  const { projectList } = useProjectListValues();
  const mapToComponent = () =>
    projectList.map(project => <Project key={project._id} data={project} />);

  return <ProjectList>{mapToComponent()}</ProjectList>;
};

export default ProjectListContainer;
