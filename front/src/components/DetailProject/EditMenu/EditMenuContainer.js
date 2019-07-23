import React from 'react';
import PropTypes from 'prop-types';
import { useListEditMenuValues } from 'store/DetailProject/ListEditMenu';
import { useToDoValues, useToDoFns } from 'store/DetailProject/ToDo';
import EditMenu from './EditMenu';

const EditMenuContainer = ({
  handleDelete,
  csstype,
  textChangeMode,
  setTextChangeMode,
  create,
  hide,
}) => {
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { toDo } = useToDoValues();
  const { setToDo } = useToDoFns();
  const toggleTextChangeMode = () => {
    if (textChangeMode) setTextChangeMode(false);
    else setTextChangeMode(true);
  };
  return (create && !hide) || (!create && isEditMode && !isMultiMode) ? (
    <EditMenu
      handleDelete={handleDelete}
      csstype={csstype}
      textChangeMode={textChangeMode}
      toggleTextChangeMode={toggleTextChangeMode}
      create={create}
      toDo={toDo}
      setToDo={setToDo}
    />
  ) : null;
};

EditMenuContainer.propTypes = {
  handleDelete: PropTypes.func,
  csstype: PropTypes.string,
  textChangeMode: PropTypes.bool,
  setTextChangeMode: PropTypes.func,
  create: PropTypes.bool,
  hide: PropTypes.bool,
};

EditMenuContainer.defaultProps = {
  handleDelete: () =>
    console.log('EditMenuContainer - handleDelete Not Defined'),
  textChangeMode: undefined,
  setTextChangeMode: () =>
    console.log('EditMenuContainer - no setTextChangeMode '),
  csstype: undefined,
  create: undefined,
  hide: undefined,
};

export default EditMenuContainer;
