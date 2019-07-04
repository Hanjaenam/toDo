import React, { createContext, useState, useContext, useEffect } from 'react';
import Project from 'components/ProjectList/Project';
import moment from 'moment';
import { useUser } from 'store/User';
import { withRouter } from 'react-router-dom';

export const ProjectContext = createContext();

const ProjectProvider = ({ children, history }) => {
  const [dataList, setData] = useState();
  const [toDeleteIds, setToDeleteId] = useState([]);
  const [isLogIn, setLogIn] = useState(false);
  const [status, setStatus] = useState({ loading: true, error: null });
  const user = useUser();
  useEffect(() => {
    if (!user) {
      history.replace('/');
    } else {
      setLogIn(true);
    }
  }, [user]);
  const loadData = data => {
    if (!Array.isArray(data)) {
      throw Error(`${data} 는 배열이 아닙니다.`);
    }
    setData(data);
  };
  const addData = data => {
    setData(s => [data, ...s]);
  };
  const deleteOneData = id => {
    setData(s => s.filter(data => data._id !== id));
  };
  const deleteManyData = idList => {
    if (!Array.isArray(idList)) {
      throw Error(`${idList} is not Array`);
    }
    setData(s => s.filter(data => !idList.some(id => data._id === id)));
  };
  const patchData = (id, newData) => {
    setData(dataList =>
      dataList.map(data => {
        if (data._id !== id) return data;
        return { ...newData };
      }),
    );
  };
  const clearData = () => {
    setData([]);
  };
  /**
   *
   * @param {String} id
   * components/Project/ProjectContainer - handleClick
   * 이 함수 하나로 id를 추가, 삭제하는 기능
   */
  const toggleToDeleteId = id => {
    setToDeleteId(s => {
      const idx = s.findIndex(_id => _id === id);
      if (idx === -1) {
        return [...s, id];
      }
      return [...s.slice(0, idx), ...s.slice(idx + 1)];
    });
  };
  const clearSelectedList = () => setToDeleteId([]);
  const mapToComponent = () =>
    dataList.map(data => (
      <Project
        id={data._id}
        key={data._id}
        title={data.title}
        createdAt={moment(data.createdAt).format('MM/ DD/ YYYY')}
      />
    ));
  const end = () => setStatus(s => ({ ...s, loading: false }));
  const wait = () => setStatus(s => ({ ...s, loading: true }));
  const failure = err => setStatus(s => ({ ...s, err }));
  return isLogIn ? (
    <ProjectContext.Provider
      value={{
        dataList,
        toDeleteIds,
        status,
        fns: {
          loadData,
          addData,
          deleteOneData,
          deleteManyData,
          patchData,
          clearData,
          mapToComponent,
          toggleToDeleteId,
          clearSelectedList,
          wait,
          failure,
          end,
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  ) : null;
};

export const useDataList = () => {
  const { dataList } = useContext(ProjectContext);
  return dataList;
};

export const useToDeleteIds = () => {
  const { toDeleteIds } = useContext(ProjectContext);
  return toDeleteIds;
};

export const useStatus = () => {
  const { status } = useContext(ProjectContext);
  return status;
};

export const useFns = () => {
  const { fns } = useContext(ProjectContext);
  return fns;
};

export default withRouter(ProjectProvider);
