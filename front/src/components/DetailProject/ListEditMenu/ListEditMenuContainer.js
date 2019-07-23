import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/DetailProject/ListEditMenu';
import ListEditMenu from './ListEditMenu';

const ListEditMenuContainer = ({ handleDeleteMany, disabled }) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { setEditMode, toggleMultiMode, initMode } = useListEditMenuFns();
  return (
    <ListEditMenu
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      setEditMode={setEditMode}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
      handleDeleteMany={handleDeleteMany}
      disabled={disabled}
    />
  );
};
ListEditMenuContainer.propTypes = {
  handleDeleteMany: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
ListEditMenuContainer.defaultProps = {
  disabled: undefined,
};

export default ListEditMenuContainer;
