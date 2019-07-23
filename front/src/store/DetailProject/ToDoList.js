import React, { createContext, useContext } from 'react';

export const ToDoListContext = createContext();

export const useToDoListValues = () => {
  const { fns, ...values } = useContext(ToDoListContext);
  return values;
};

export const useToDoListFns = () => {
  const { fns } = useContext(ToDoListContext);
  return fns;
};
const ToDoListProvider = ({ children, value }) => (
  <ToDoListContext.Provider value={value}>{children}</ToDoListContext.Provider>
);

export default ToDoListProvider;
