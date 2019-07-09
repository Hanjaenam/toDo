import React from 'react';
import PropTypes from 'prop-types';
import { useListEditMenuValues } from 'store/Common/ListEditMenu';
import EditMenu from './EditMenu';

const EditMenuContainer = ({
  titleChangeMode,
  setTitleChangeMode,
  handleDelete,
  csstype,
}) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  return (
    <EditMenu
      titleChangeMode={titleChangeMode}
      setTitleChangeMode={setTitleChangeMode}
      handleDelete={handleDelete}
      csstype={csstype}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
    />
  );
};

EditMenuContainer.propTypes = {
  titleChangeMode: PropTypes.bool.isRequired,
  setTitleChangeMode: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  csstype: PropTypes.string,
};

EditMenuContainer.defaultProps = {
  csstype: undefined,
};

export default EditMenuContainer;
