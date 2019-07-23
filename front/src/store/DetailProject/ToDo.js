import React, { createContext, useContext, useState } from 'react';

export const ToDoContext = createContext();
const ToDoProvider = ({ children, data }) => {
  const [toDo, setToDo] = useState(data);
  return (
    <ToDoContext.Provider value={{ toDo, fns: { setToDo } }}>
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDoValues = () => {
  const { fns, ...values } = useContext(ToDoContext);
  return values;
};

export const useToDoFns = () => {
  const { fns } = useContext(ToDoContext);
  return fns;
};

export default ToDoProvider;
