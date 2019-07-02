import React, { createContext, useState, useContext } from 'react';
import ToDoList from 'components/Project/ToDoList';

export const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [dataList, setData] = useState([]);
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
  const loadData = data => {
    if (!Array.isArray(data)) {
      throw Error(`${data} 는 배열이 아닙니다.`);
    }
    setData(data);
  };
  const mapToComponent = () => {
    dataList.map(data => <ToDoList data={data} createdAt={data.createdAt} />);
  };
  return (
    <ProjectContext.Provider
      value={{
        dataList,
        fns: {
          addData,
          deleteOneData,
          deleteManyData,
          patchData,
          clearData,
          loadData,
          mapToComponent,
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useDataList = () => {
  const { dataList } = useContext(ProjectContext);
  return dataList;
};
export const useFns = () => {
  const { fns } = useContext(ProjectContext);
  return fns;
};
export default ProjectProvider;
