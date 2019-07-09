import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import ListEditMenu from './ListEditMenu';

const ListEditMenuContainer = ({ handleDeleteMany }) => {
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
    />
  );
};
ListEditMenuContainer.propTypes = {
  handleDeleteMany: PropTypes.func.isRequired,
};
export default ListEditMenuContainer;
