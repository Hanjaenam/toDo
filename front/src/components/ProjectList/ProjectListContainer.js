import React from 'react';
import EditProject from 'components/ProjectList/EditProject';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import { useProjectListValues } from 'pages/ProjectList';
import Project from 'components/ProjectList/Project';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  const { projectList } = useProjectListValues();
  const mapToComponent = () =>
    projectList.map(project => (
      <Project id={project._id} key={project._id} data={project} />
    ));
  return (
    <ListEditMenuProvider>
      <ProjectList EditProject={<EditProject />}>
        {mapToComponent()}
      </ProjectList>
    </ListEditMenuProvider>
  );
};
export default ProjectListContainer;
