import React, { createContext, useState, useContext } from 'react';

export const AddProjectContext = createContext();

const AddProjectProvider = ({ children }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [isMultiMode, setMultiMode] = useState(false);
  const toggleEditMode = mode => setEditMode(mode);
  const toggleMultiMode = () => setMultiMode(!isMultiMode);
  const initMode = () => {
    setEditMode(false);
    setMultiMode(false);
  };
  return (
    <AddProjectContext.Provider
      value={{
        isEditMode,
        isMultiMode,
        fns: { toggleEditMode, toggleMultiMode, initMode },
      }}
    >
      {children}
    </AddProjectContext.Provider>
  );
};

export const useAddProjectValue = () => {
  const { isEditMode, isMultiMode } = useContext(AddProjectContext);
  return { isEditMode, isMultiMode };
};

export const useFns = () => {
  const { fns } = useContext(AddProjectContext);
  return fns;
};

export default AddProjectProvider;
