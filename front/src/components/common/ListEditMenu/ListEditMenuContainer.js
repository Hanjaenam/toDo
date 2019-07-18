import React from 'react';
import PropTypes from 'prop-types';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import ListEditMenu from './ListEditMenu';

const ListEditMenuContainer = ({ handleDeleteMany, page }) => {
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
      page={page}
    />
  );
};
ListEditMenuContainer.propTypes = {
  handleDeleteMany: PropTypes.func.isRequired,
  page: PropTypes.string,
};
ListEditMenuContainer.defaultProps = {
  page: undefined,
};
export default ListEditMenuContainer;
