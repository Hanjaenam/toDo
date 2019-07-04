import React, { createContext, useState, useContext, useEffect } from 'react';
import Project from 'components/ProjectList/Project';
import ToDoList from 'components/DetailProject/ToDoList';
import moment from 'moment';
import { useUser } from 'store/User';
import { withRouter } from 'react-router-dom';

export const ProjectContext = createContext();

const ProjectProvider = ({ children, history }) => {
  const [projectDatas, setProjectDatas] = useState();
  const [toDoListDatas, setToDoListDatas] = useState();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [toDeleteIds, setToDeleteId] = useState([]);
  const [isLogIn, setLogIn] = useState(false);
  // const [status, setStatus] = useState({ loading: true, error: null });
  const user = useUser();
  useEffect(() => {
    if (!user) {
      history.replace('/');
    } else {
      setLogIn(true);
    }
  }, [user]);
  const processFnByType = (fn, type) => {
    if (type === 'project') {
      setProjectDatas(fn);
    } else if (type === 'toDoList') {
      setToDoListDatas(fn);
    }
  };
  const loadData = ({ data, type = 'project' }) => {
    if (!Array.isArray(data)) {
      throw Error(`${data} 는 배열이 아닙니다.`);
    }
    const fn = () => data;
    processFnByType(fn, type);
  };
  const unshiftData = ({ data, type = 'project' }) => {
    const fn = state => [data, ...state];
    processFnByType(fn, type);
  };
  const deleteOneData = ({ id, type = 'project' }) => {
    const fn = state => state.filter(data => data._id !== id);
    processFnByType(fn, type);
  };
  const deleteManyData = ({ idList, type = 'project' }) => {
    if (!Array.isArray(idList)) {
      throw Error(`${idList} is not Array`);
    }
    const fn = state =>
      state.filter(data => !idList.some(id => data._id === id));
    processFnByType(fn, type);
  };
  const patchData = ({ id, newData, type = 'project' }) => {
    const fn = state =>
      state.map(data => {
        if (data._id !== id) return data;
        return { ...newData };
      });
    processFnByType(fn, type);
  };
  const clearData = ({ type = 'project' }) => {
    const fn = () => undefined;
    processFnByType(fn, type);
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
          id={data._id}
          key={data._id}
          data={data}
          createdAt={moment(data.createdAt).format('MM/ DD/ YYYY')}
        />
      ));
    }
  };
  /**
   *
   * @param {String} id
   * components/Project/ProjectContainer - handleClick
   * 이 함수 하나로 id를 추가, 삭제하는 기능
   */
  const toggleToDeleteId = id => {
    setToDeleteId(state => {
      const idx = state.findIndex(_id => _id === id);
      if (idx === -1) {
        return [...state, id];
      }
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    });
  };
  const clearSelectedList = () => setToDeleteId([]);
  // const end = () => setStatus(state => ({ ...state, loading: false }));
  // const wait = () => setStatus(state => ({ ...state, loading: true }));
  // const failure = err => setStatus(state => ({ ...state, err }));
  const selectProject = id => setSelectedProjectId(id);
  return isLogIn ? (
    <ProjectContext.Provider
      value={{
        projectDatas,
        toDoListDatas,
        etc: { toDeleteIds, selectedProjectId },
        fns: {
          loadData,
          unshiftData,
          deleteOneData,
          deleteManyData,
          patchData,
          clearData,
          mapToComponent,
          toggleToDeleteId,
          clearSelectedList,
          selectProject,
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  ) : null;
};

export const useProjectDatas = () => {
  const { projectDatas } = useContext(ProjectContext);
  return projectDatas;
};

export const useToDoListDatas = () => {
  const { toDoListDatas } = useContext(ProjectContext);
  return toDoListDatas;
};

export const useProjectValue = () => {
  const { etc } = useContext(ProjectContext);
  return etc;
};

export const useProjectFns = () => {
  const { fns } = useContext(ProjectContext);
  return fns;
};

export default withRouter(ProjectProvider);
