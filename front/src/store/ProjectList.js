import React, { createContext, useState, useContext } from 'react';
import Project from 'components/ProjectList/Project';
import moment from 'moment';
import {
  unshift,
  deleteOne,
  deleteMany,
  patch,
  checkArray,
  checkObject,
} from 'lib/manuArrData';

export const ProjectListContext = createContext();

const ProjectListProvider = ({ children }) => {
  const [projectDatas, setProjectDatas] = useState();

  const isExist = data => {
    const existedTitleIdx = projectDatas.findIndex(
      projectData => projectData.title === data.title,
    );
    if (existedTitleIdx !== -1) {
      return {
        message: `${data.title}은 이미 존재하는 title입니다.`,
        index: existedTitleIdx,
      };
    }
    return true;
  };
  const loadProject = data => {
    checkArray(data);
    setProjectDatas(data);
  };
  const unshiftProject = data => {
    checkObject(data);
    if (!isExist(data)) return false;
    setProjectDatas(unshift(data));
    return true;
  };
  const deleteOneProject = id => {
    setProjectDatas(deleteOne(id));
  };
  const deleteManyProject = idList => {
    checkArray(idList);
    setProjectDatas(deleteMany(idList));
  };
  const patchProject = ({ id, patchedData }) => {
    setProjectDatas(patch({ id, patchedData }));
  };
  const mapToComponent = () =>
    projectDatas.map(data => (
      <Project
        id={data._id}
        key={data._id}
        title={data.title}
        createdAt={moment(data.createdAt).format('YYYY-MM-DD')}
      />
    ));
  return (
    <ProjectListContext.Provider
      value={{
        projectDatas,
        fns: {
          loadProject,
          unshiftProject,
          deleteOneProject,
          deleteManyProject,
          patchProject,
          mapToComponent,
        },
      }}
    >
      {children}
    </ProjectListContext.Provider>
  );
};

export const useProjectListValues = () => {
  const { fns, ...values } = useContext(ProjectListContext);
  return values;
};

export const useProjectListFns = () => {
  const { fns } = useContext(ProjectListContext);
  return fns;
};

export default ProjectListProvider;
