import React, { createContext, useState, useContext } from 'react';
import ToDo from 'components/ToDo/ToDo';

export const ToDoListContext = createContext();
const ToDoListProvider = ({ children }) => {
  const [dataList, setData] = useState([
    <ToDo />,
    <ToDo />,
    <ToDo />,
    <ToDo />,
    <ToDo />,
    <ToDo />,
    <ToDo />,
    <ToDo />,
    <ToDo />,
  ]);
  return (
    <ToDoListContext.Provider value={{ dataList }}>
      {children}
    </ToDoListContext.Provider>
  );
};

export const useToDoList = () => {
  const { dataList } = useContext(ToDoListContext);
  return dataList;
};
export default ToDoListProvider;
