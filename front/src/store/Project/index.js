import React, { createContext, useState, useContext, useEffect } from 'react';
import Project from 'components/ProjectList/Project';
import ToDoList from 'components/DetailProject/ToDoList';
import moment from 'moment';
import { useUser } from 'store/User';
import { withRouter } from 'react-router-dom';
import {
  unshift,
  deleteOne,
  deleteMany,
  patch,
  init,
  checkArray,
} from 'lib/manuArrData';

export const ProjectContext = createContext();

const ProjectProvider = ({ children, history }) => {
  const [projectDatas, setProjectDatas] = useState();
  const [toDoListDatas, setToDoListDatas] = useState();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const user = useUser();
  useEffect(() => {
    if (!user) {
      history.replace('/');
    }
  }, [user]);
  const processFnByType = (fn, type) => {
    if (type === 'project') {
      setProjectDatas(fn);
    } else if (type === 'toDoList') {
      setToDoListDatas(fn);
    }
  };
  const isExistedData = (data, type) => {
    if (type === 'project') {
      const existedTitleIdx = projectDatas.findIndex(
        projectData => projectData.title === data.title,
      );
      if (existedTitleIdx !== -1) {
        return {
          message: `${data.title}은 이미 존재하는 title입니다.`,
          index: existedTitleIdx,
        };
      }
    }
    return true;
  };
  const loadData = ({ data, type = 'project' }) => {
    checkArray(data);
    processFnByType(data, type);
  };
  const unshiftData = ({ data, type = 'project' }) => {
    if (!isExistedData(data, type)) return false;
    processFnByType(unshift(data), type);
    return true;
  };
  const deleteOneData = ({ id, type = 'project' }) => {
    processFnByType(deleteOne(id), type);
  };
  const deleteManyData = ({ idList, type = 'project' }) => {
    checkArray(idList);
    processFnByType(deleteMany(idList), type);
  };
  const patchData = ({ id, newData, type = 'project' }) => {
    processFnByType(patch({ id, newData }), type);
  };
  const initData = ({ type = 'project' }) => {
    processFnByType(init(), type);
  };
  const mapToComponent = ({ type = 'project' } = {}) => {
    if (type === 'project') {
      return projectDatas.map(data => (
        <Project
          id={data._id}
          key={data._id}
          title={data.title}
          createdAt={moment(data.createdAt).format('MM/ DD/ YYYY')}
        />
      ));
    }
    if (type === 'toDoList') {
      return toDoListDatas.map(data => (
        <ToDoList
          key={data._id}
          id={data._id}
          createdAt={moment(data.createdAt).format('MM/ DD/ YYYY')}
        />
      ));
    }
  };
  const selectProject = id => setSelectedProjectId(id);
  return user ? (
    <ProjectContext.Provider
      value={{
        projectDatas,
        toDoListDatas,
        selectedProjectId,
        fns: {
          loadData,
          unshiftData,
          deleteOneData,
          deleteManyData,
          patchData,
          initData,
          mapToComponent,
          selectProject,
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
