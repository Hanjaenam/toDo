import React, { useEffect, useState } from 'react';
import Star from './Star';

const StarContainer = ({
  importance = 1,
  isEditMode = false,
  styles,
  onConfirm,
}) => {
  const [editImportance, setEditImportance] = useState({
    NO_CHANGE_IMPORTANCE: importance,
    changeImportance: importance,
  });
  const setChangeImportance = changeImportance =>
    setEditImportance(s => ({ ...s, changeImportance }));
  const handleMouseEnter = idx => {
    setChangeImportance(idx + 1);
  };
  const handleMouseLeave = () => {
    setChangeImportance(importance);
  };
  const init = () => {
    setEditImportance({
      NO_CHANGE_IMPORTANCE: editImportance.NO_CHANGE_IMPORTANCE,
      changeImportance: editImportance.NO_CHANGE_IMPORTANCE,
    });
    onConfirm && onConfirm(editImportance.NO_CHANGE_IMPORTANCE);
  };
  useEffect(() => {
    if (!isEditMode) {
      init();
    }
  }, [isEditMode]);
  return (
    <Star
      importance={importance}
      isEditMode={isEditMode}
      styles={styles}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      changeImportance={editImportance.changeImportance}
      onConfirm={onConfirm}
    />
  );
};
export default StarContainer;
