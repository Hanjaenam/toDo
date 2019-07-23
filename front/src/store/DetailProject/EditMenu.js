import React, { createContext, useContext } from 'react';
import { useTextChangeMode, useToDoMemo } from 'lib/hooks';
import { useListEditMenuValues } from './ListEditMenu';

export const EditMenuContext = createContext();

const EditMenuProvider = ({ children }) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { textChangeMode, setTextChangeMode } = useTextChangeMode({
    isEditMode,
    isMultiMode,
  });
  const { showToDoMemo, setShowToDoMemo } = useToDoMemo({
    isEditMode,
  });
  const toggleShowToDoMemo = e => {
    e.stopPropagation();
    setShowToDoMemo(!showToDoMemo);
  };
  return (
    <EditMenuContext.Provider
      value={{
        textChangeMode,
        showToDoMemo,
        fns: {
          setTextChangeMode,
          toggleShowToDoMemo,
        },
      }}
    >
      {children}
    </EditMenuContext.Provider>
  );
};

export const useEditMenuValues = () => {
  const { fns, ...values } = useContext(EditMenuContext);
  return values;
};

export const useEditMenuFns = () => {
  const { fns } = useContext(EditMenuContext);
  return fns;
};

export default EditMenuProvider;
