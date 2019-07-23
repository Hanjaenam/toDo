import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

const StarContainer = ({ importance, isEditMode, styles, setImportance }) => {
  const [hoverImportance, setHoverImportance] = useState();
  useEffect(() => {
    if (!isEditMode) setHoverImportance(importance);
  }, [isEditMode]);
  const handleMouseEnter = idx => {
    if (!isEditMode) return;
    setHoverImportance(idx + 1);
  };
  const handleMouseLeave = () => {
    if (!isEditMode) return;
    setHoverImportance(importance);
  };
  return (
    <Star
      importance={importance}
      hoverImportance={hoverImportance}
      isEditMode={isEditMode}
      styles={styles}
      setImportance={setImportance}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};

StarContainer.propTypes = {
  importance: PropTypes.number,
  isEditMode: PropTypes.bool,
  setImportance: PropTypes.func,
};

StarContainer.defaultProps = {
  importance: 1,
  isEditMode: undefined,
  setImportance: undefined,
};
export default StarContainer;
