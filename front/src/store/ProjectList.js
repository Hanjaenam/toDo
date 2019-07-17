import React, { createContext, useContext } from 'react';

export const ProjectListContext = createContext();

export const useProjectListValues = () => {
  const { fns, ...values } = useContext(ProjectListContext);
  return values;
};
export const useProjectListFns = () => {
  const { fns } = useContext(ProjectListContext);
  return fns;
};

const ProjectListProvider = ({ children, value }) => (
  <ProjectListContext.Provider value={value}>
    {children}
  </ProjectListContext.Provider>
);

export default ProjectListProvider;
