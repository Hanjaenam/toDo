import React, { createContext, useState, useContext } from 'react';
import Project from 'components/ProjectList/Project';
import moment from 'moment';

export const ProjectListContext = createContext();

const ProjectListProvider = ({ children }) => {
  const [dataList, setData] = useState([]);
  const [selectedIdList, setId] = useState([]);
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
  /**
   *
   * @param {String} id
   * components/Project/ProjectContainer - handleClick
   * 이 함수 하나로 id를 추가, 삭제하는 기능
   */
  const setSelectedId = id => {
    setId(s => {
      const idx = s.findIndex(_id => _id === id);
      if (idx === -1) {
        return [...s, id];
      }
      return [...s.slice(0, idx), ...s.slice(idx + 1)];
    });
  };
  const clearSelectedList = () => {
    setId([]);
  };
  const mapToComponent = () =>
    dataList.map(data => (
      <Project
        id={data._id}
        key={data._id}
        title={data.title}
        createdAt={moment(data.createdAt).format('MM/ DD/ YYYY')}
      />
    ));
  return (
    <ProjectListContext.Provider
      value={{
        dataList,
        selectedIdList,
        fns: {
          addData,
          patchData,
          loadData,
          clearData,
          deleteOneData,
          deleteManyData,
          setSelectedId,
          clearSelectedList,
          mapToComponent,
        },
      }}
    >
      {children}
    </ProjectListContext.Provider>
  );
};

export const useDataList = () => {
  const { dataList } = useContext(ProjectListContext);
  return dataList;
};

export const useSelectedIdList = () => {
  const { selectedIdList } = useContext(ProjectListContext);
  return selectedIdList;
};

export const useFns = () => {
  const { fns } = useContext(ProjectListContext);
  return fns;
};

export default ProjectListProvider;
