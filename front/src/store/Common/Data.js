import React, { createContext, useState, useContext } from 'react';
import Project from 'components/ProjectList/Project';
import {
  unshift,
  push,
  deleteOne,
  deleteMany,
  patch,
  checkArray,
  checkObject,
} from 'lib/manuArrData';
import ToDoList from 'components/DetailProject/ToDoList';
import EditMenuProvider from 'store/Common/EditMenu';

export const TYPE = {
  PROJECT_LIST: 'projectList',
  DETAIL_PROJECT: 'detailProject',
};

export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [projectList, setProjectList] = useState();
  const [detailProject, setDetailProject] = useState();
  const loadData = ({ type, data }) => {
    if (type === TYPE.PROJECT_LIST) setProjectList(data);
    if (type === TYPE.DETAIL_PROJECT) setDetailProject(data);
  };
  const pushData = ({ type, data }) => {
    checkObject(data);
    if (type === TYPE.PROJECT_LIST) setProjectList(push(data));
    if (type === TYPE.DETAIL_PROJECT) setDetailProject(push(data));
  };
  const unshiftData = ({ type, data }) => {
    checkObject(data);
    if (type === TYPE.PROJECT_LIST) setProjectList(unshift(data));
    if (type === TYPE.DETAIL_PROJECT) setDetailProject(unshift(data));
  };
  const deleteOneData = ({ type, id }) => {
    if (type === TYPE.PROJECT_LIST) setProjectList(deleteOne(id));
    if (type === TYPE.DETAIL_PROJECT) setDetailProject(deleteOne(id));
  };
  const deleteManyData = ({ type, idList }) => {
    checkArray(idList);
    if (type === TYPE.PROJECT_LIST) setProjectList(deleteMany(idList));
    if (type === TYPE.DETAIL_PROJECT) setDetailProject(deleteMany(idList));
  };
  const patchData = ({ type, id, patchedData }) => {
    if (type === TYPE.PROJECT_LIST) setProjectList(patch(id, patchedData));
    if (type === TYPE.DETAIL_PROJECT) setDetailProject(patch(id, patchedData));
  };
  const init = ({ type }) => {
    if (type === TYPE.PROJECT_LIST) setProjectList([]);
    if (type === TYPE.DETAIL_PROJECT) setDetailProject([]);
  };
  const mapToComponent = ({ type }) => {
    if (type === TYPE.PROJECT_LIST) {
      return projectList.map(data => (
        <Project id={data._id} key={data._id} data={data} />
      ));
    }
    if (type === TYPE.DETAIL_PROJECT) {
      return detailProject.map(({ toDoList: data, _id }) => (
        <EditMenuProvider key={_id}>
          <ToDoList data={data} createdAt={_id} />
        </EditMenuProvider>
      ));
    }
  };
  return (
    <DataContext.Provider
      value={{
        projectList,
        detailProject,
        fns: {
          loadData,
          pushData,
          unshiftData,
          deleteOneData,
          deleteManyData,
          patchData,
          init,
          mapToComponent,
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataValues = () => {
  const { fns, ...values } = useContext(DataContext);
  return values;
};

export const useDataFns = () => {
  const { fns } = useContext(DataContext);
  return fns;
};

export default DataProvider;
