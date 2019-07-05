import React, { createContext, useContext, useState } from 'react';

export const EditMenuContext = createContext();
const EditMenuProvider = ({ children }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [isMultiMode, setMultiMode] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState([]);
  /**
   *
   * @param {String} id
   * components/Project/ProjectContainer - handleClick
   * 이 함수 하나로 id를 추가, 삭제하는 기능
   */
  const toggleIdsToDelete = id => {
    setIdsToDelete(state => {
      const idx = state.findIndex(_id => _id === id);
      if (idx === -1) {
        return [...state, id];
      }
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    });
  };
  const toggleMultiMode = () => setMultiMode(!isMultiMode);
  const clearIdsToDelete = () => setIdsToDelete([]);
  const initMode = () => {
    setEditMode(false);
    setMultiMode(false);
    clearIdsToDelete();
  };
  return (
    <EditMenuContext.Provider
      value={{
        isEditMode,
        isMultiMode,
        idsToDelete,
        fns: {
          toggleIdsToDelete,
          toggleMultiMode,
          clearIdsToDelete,
          initMode,
          setEditMode,
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
