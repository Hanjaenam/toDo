import React, { createContext, useContext } from 'react';
import { useChangeTitleMode, useToDoMemo } from 'lib/hooks';
import { useListEditMenuValues } from 'store/Common/ListEditMenu';

export const EditMenuContext = createContext();

const EditMenuProvider = ({ children }) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { titleChangeMode, setTitleChangeMode } = useChangeTitleMode({
    isEditMode,
    isMultiMode,
  });
  const { showToDoMemo, setShowToDoMemo } = useToDoMemo({
    isEditMode,
  });
  const toggleShowToDoMemo = () => {
    setShowToDoMemo(!showToDoMemo);
  };
  return (
    <EditMenuContext.Provider
      value={{
        titleChangeMode,
        showToDoMemo,
        fns: {
          setTitleChangeMode,
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
