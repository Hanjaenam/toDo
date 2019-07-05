import React, { createContext, useState, useContext } from 'react';
import ToDo from 'components/DetailProject/ToDo';
import {
  unshift,
  deleteOne,
  deleteMany,
  patch,
  init,
  checkArray,
} from 'lib/manuArrData';

export const ToDoListContext = createContext();

const ToDoListProvider = ({ children }) => {
  const [toDoListDatas, setToDoListDatas] = useState();
  const loadData = data => {
    checkArray(data);
    setToDoListDatas(data);
  };
  const unshiftData = data => {
    setToDoListDatas(unshift(data));
  };
  const deleteOneData = id => {
    setToDoListDatas(deleteOne(id));
  };
  const deleteMenyData = idList => {
    checkArray(idList);
    setToDoListDatas(deleteMany(idList));
  };
  const patchData = ({ id, newData }) => {
    setToDoListDatas(patch({ id, newData }));
  };
  const initData = () => {
    setToDoListDatas(init());
  };

  const mapToComponent = () =>
    toDoListDatas.map(data => (
      <ToDo id={data._id} key={data._id ? data._id : data.title} data={data} />
    ));
  // const [idsToDelete, setIdsToDelete] = useState([]);
  // const [isEditMode, setEditMode] = useState(false);
  // const [isMultiMode, setMultiMode] = useState(false);
  // const toggleMultiMode = () => {
  //   setMultiMode(!isMultiMode);
  // };
  // const toggleIdToDelete = title => {
  //   setIdsToDelete(state => {
  //     const idx = state.findIndex(_title => _title === title);
  //     if (idx === -1) return [...state, title];
  //     return [...state.slice(0, idx), ...state.slice(idx + 1)];
  //   });
  // };
  // const clearIdsToDelete = () => setIdsToDelete([]);
  // const initMode = () => {
  //   setEditMode(false);
  //   setMultiMode(false);
  //   clearIdsToDelete();
  // };
  return (
    <ToDoListContext.Provider
      value={{
        toDoListDatas,
        // etc: {
        //   isEditMode,
        //   isMultiMode,
        //   idsToDelete,
        // },
        fns: {
          loadData,
          unshiftData,
          deleteOneData,
          deleteMenyData,
          patchData,
          mapToComponent,
          initData,
          // setEditMode,
          // toggleMultiMode,
          // toggleIdToDelete,
          // initMode,
        },
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};
export const useToDoListDatas = () => {
  const { toDoListDatas } = useContext(ToDoListContext);
  return toDoListDatas;
};
// export const useToDoListEtc = () => {
//   const { etc } = useContext(ToDoListContext);
//   return etc;
// };
export const useToDoListFns = () => {
  const { fns } = useContext(ToDoListContext);
  return fns;
};
export default ToDoListProvider;
