import React, { createContext, useState, useContext } from 'react';
import {
  push,
  deleteOne,
  deleteMany,
  checkArray,
  checkObject,
} from 'lib/manuArrData';
import ToDoList from 'components/DetailProject/ToDoList';
import ToDo from 'components/DetailProject/ToDo';

export const DetailProjectContext = createContext();

const DetailProjectProvider = ({ children }) => {
  const [projectId, setProjectId] = useState();
  const [toDoListDatas, setToDoListDatas] = useState();
  const loadData = data => {
    checkArray(data);
    setToDoListDatas(data);
  };
  const pushToDoList = data => {
    checkObject(data);
    setToDoListDatas(push(data));
  };
  const deleteOneToDoList = id => {
    setToDoListDatas(deleteOne(id));
  };
  const deleteMenyToDoList = idList => {
    checkArray(idList);
    setToDoListDatas(deleteMany(idList));
  };
  const findToDoList = (toDoListDatas, toDoListId) => {
    const idx = toDoListDatas.findIndex(
      toDoList => toDoList._id === toDoListId,
    );
    if (idx === -1) throw new Error('존재하지 않는 toDoList 입니다.');
  };
  const unshiftToDo = ({ toDoListId, data }) => {
    checkObject(data);
    setToDoListDatas(state => {
      try {
        const idx = findToDoList(state, toDoListId);
        return state.map(toDoList =>
          toDoList._id === idx
            ? { ...toDoList, toDo: [data, ...toDoList.toDo] }
            : toDoList,
        );
      } catch (err) {
        console.log(`DetailProject - unshiftToDo : ${err}`);
        return state;
      }
    });
  };
  const deleteOneToDo = ({ toDoListId, title }) => {
    setToDoListDatas(state => {
      try {
        const idx = findToDoList(state, toDoListId);
        toDoListDatas[idx].toDo = toDoListDatas[idx].toDo.filter(
          data => data.title !== title,
        );
        return toDoListDatas;
      } catch (err) {
        console.log(`DetailProject - deleteOneToDo : ${err}`);
        return state;
      }
    });
  };
  const deleteManyToDo = ({ toDoListId, titles }) => {
    checkArray(titles);
    setToDoListDatas(state => {
      try {
        const idx = findToDoList(state, toDoListId);
        if (idx === -1) return state;
        toDoListDatas[idx].toDo = toDoListDatas[idx].toDo.filter(
          data => !titles.some(title => title === data.title),
        );
        return toDoListDatas;
      } catch (err) {
        console.log(`DetailProject - deleteManyToDo : ${err}`);
        return state;
      }
    });
  };
  const patchToDo = ({ toDoListId, title, newData }) => {
    checkObject(newData);
    setToDoListDatas(state => {
      try {
        const idx = findToDoList(state, toDoListId);
        toDoListDatas[idx].toDo[title] = newData;
        return toDoListDatas;
      } catch (err) {
        console.log(`DetailProject - patchToDo : ${err}`);
        return state;
      }
    });
  };
  const mapToComponent = () =>
    toDoListDatas.map(toDoListData => (
      <ToDoList
        key={toDoListData._id}
        id={toDoListData._id}
        createdAt={toDoListData.createdAt}
      >
        {toDoListData.toDo.map(toDoData => (
          <ToDo key={toDoData._id} id={toDoData._id} data={toDoData} />
        ))}
      </ToDoList>
    ));

  return (
    <DetailProjectContext.Provider
      value={{
        toDoListDatas,
        projectId,
        fns: {
          loadData,
          pushToDoList,
          deleteOneToDoList,
          deleteMenyToDoList,
          unshiftToDo,
          deleteOneToDo,
          deleteManyToDo,
          patchToDo,
          mapToComponent,
          setProjectId,
        },
      }}
    >
      {children}
    </DetailProjectContext.Provider>
  );
};
export const useDetailProjectValues = () => {
  const { fns, ...values } = useContext(DetailProjectContext);
  return values;
};
export const useDetailProjectFns = () => {
  const { fns } = useContext(DetailProjectContext);
  return fns;
};
export default DetailProjectProvider;
