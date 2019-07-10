import React, { createContext, useContext, useState } from 'react';

export const ListEditMenuContext = createContext();
const ListEditMenuProvider = ({ children }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [isMultiMode, setMultiMode] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState([]);
  const [titleChangeMode, setTitleChangeMode] = useState(false);
  /**
   *
   * @param {String} id
   * components/Project/ProjectContainer - handleClick
   * 이 함수 하나로 id를 추가, 삭제하는 기능
   */
  const addOrRemoveIdToDelete = id => {
    setIdsToDelete(state => {
      const idx = state.findIndex(_id => _id === id);
      if (idx === -1) {
        return [...state, id];
      }
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    });
  };
  const clearIdsToDelete = () => setIdsToDelete([]);
  const toggleMultiMode = () => {
    if (isMultiMode) clearIdsToDelete();
    setMultiMode(!isMultiMode);
  };
  const initMode = () => {
    setEditMode(false);
    setMultiMode(false);
    clearIdsToDelete();
  };
  const isSelected = id => idsToDelete.some(idToDelete => idToDelete === id);
  return (
    <ListEditMenuContext.Provider
      value={{
        isEditMode,
        isMultiMode,
        idsToDelete,
        titleChangeMode,
        fns: {
          addOrRemoveIdToDelete,
          toggleMultiMode,
          clearIdsToDelete,
          initMode,
          setEditMode,
          isSelected,
          setTitleChangeMode,
        },
      }}
    >
      {children}
    </ListEditMenuContext.Provider>
  );
};

export const useListEditMenuValues = () => {
  const { fns, ...values } = useContext(ListEditMenuContext);
  return values;
};
export const useListEditMenuFns = () => {
  const { fns } = useContext(ListEditMenuContext);
  return fns;
};

export default ListEditMenuProvider;
