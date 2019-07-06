import React, { createContext, useState, useContext, useEffect } from 'react';
import Project from 'components/ProjectList/Project';
import moment from 'moment';
import { useUser } from 'store/User';
import { withRouter } from 'react-router-dom';
import {
  unshift,
  deleteOne,
  deleteMany,
  patch,
  checkArray,
  checkObject,
} from 'lib/manuArrData';

export const ProjectContext = createContext();

const ProjectProvider = ({ children, history }) => {
  const [projectDatas, setProjectDatas] = useState();
  const user = useUser();
  useEffect(() => {
    if (!user) {
      history.replace('/');
    }
  }, [user]);

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
  const patchProject = ({ id, newProject }) => {
    setProjectDatas(patch({ id, newProject }));
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
  return user ? (
    <ProjectContext.Provider
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
    </ProjectContext.Provider>
  ) : null;
};

export const useProjectValues = () => {
  const { fns, ...values } = useContext(ProjectContext);
  return values;
};

export const useProjectFns = () => {
  const { fns } = useContext(ProjectContext);
  return fns;
};

export default withRouter(ProjectProvider);
