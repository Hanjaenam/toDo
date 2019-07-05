import React, { useState, useEffect } from 'react';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import ToDo from './ToDo';

const ToDoContainer = ({ data }) => {
  const [isChangeTitleMode, setChangeTitleMode] = useState(false);
  const { isEditMode, isMultiMode, idsToDelete } = useEditMenuValues();
  const { toggleIdsToDelete } = useEditMenuFns();
  useEffect(() => {
    if (!isEditMode && isChangeTitleMode) {
      setChangeTitleMode(false);
    }
  }, [isEditMode]);
  const handleClick = e => {
    if (!isEditMode) {
    } else if (isMultiMode) {
      toggleIdsToDelete(data.title);
    }
  };
  return (
    <ToDo
      title={data.title}
      content={data.content}
      isCompleted={data.isCompleted}
      completedAt={data.completedAt}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      isSelected={idsToDelete.some(
        selectedTitle => selectedTitle === data.title,
      )}
      isChangeTitleMode={isChangeTitleMode}
      setChangeTitleMode={setChangeTitleMode}
      handleClick={handleClick}
    />
  );
};
export default ToDoContainer;
