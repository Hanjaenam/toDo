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
  const mapToComponent = type => {
    if (type === 'toDoList') {
      return toDoListDatas.map(data => (
        <ToDoList key={data._id} id={data._id} createdAt={data.createdAt} />
      ));
    }
    if (type === 'toDo') {
      const toDoDatas = toDoListDatas.toDo;
      return toDoDatas.map(data => (
        <ToDo
          key={data._id}
          id={data._id}
          title={data.title}
          content={data.content}
          isCompleted={data.isCompleted}
          completedAt={data.completedAt}
        />
      ));
    }
  };

  return (
    <DetailProjectContext.Provider
      value={{
        toDoListDatas,
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
        },
      }}
    >
      {children}
    </DetailProjectContext.Provider>
  );
};
export const useEditProjectValues = () => {
  const { toDoDatas } = useContext(DetailProjectContext);
  return toDoDatas;
};
export const useEditProjectFns = () => {
  const { fns } = useContext(DetailProjectContext);
  return fns;
};
export default DetailProjectProvider;
