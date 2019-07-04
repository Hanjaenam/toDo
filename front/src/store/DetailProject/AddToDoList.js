import React, { createContext, useState, useContext } from 'react';
import ToDo from 'components/DetailProject/ToDo';

export const AddToDoListContext = createContext();

const AddToDoListProvider = ({ children }) => {
  const [toDoListDatas, setToDoListDatas] = useState([{ title: 'test' }]);
  const unshiftData = data => {
    setToDoListDatas(state => [data, ...state]);
  };
  const deleteOneData = title =>
    setToDoListDatas(state => state.filter(data => data.title !== title));
  const deleteMenyData = titleList => {
    if (!Array.isArray(titleList)) {
      throw Error(`${titleList} is not Array`);
    }
    setToDoListDatas(data => !titleList.some(title => data.title === title));
  };
  const patchData = ({ title, newData }) =>
    setToDoListDatas(state =>
      state.map(data => {
        if (data.title !== title) return data;
        return { ...newData };
      }),
    );
  const mapToComponent = () =>
    toDoListDatas.map(data => <ToDo key={data.title} title={data.title} />);
  return (
    <AddToDoListContext.Provider
      value={{
        toDoListDatas,
        fns: {
          unshiftData,
          deleteOneData,
          deleteMenyData,
          patchData,
          mapToComponent,
        },
      }}
    >
      {children}
    </AddToDoListContext.Provider>
  );
};
export const useToDoListDatas = () => {
  const { toDoListDatas } = useContext(AddToDoListContext);
  return toDoListDatas;
};
export const useAddToDoListFns = () => {
  const { fns } = useContext(AddToDoListContext);
  return fns;
};
export default AddToDoListProvider;
