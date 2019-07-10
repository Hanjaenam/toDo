import React from 'react';
import PropTypes from 'prop-types';
import {
  faTasks,
  faEdit,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { HOVER_TYPE } from 'styles/mixins';
import Button from 'components/Common/Button';
import theme from 'styles/theme';

const ListEditMenu = ({
  isEditMode,
  isMultiMode,
  setEditMode,
  toggleMultiMode,
  initMode,
  handleDeleteMany,
}) => {
  const buttonStyles = {
    fontSize: '1.5rem',
    paddingLeft: `${theme.PADDING.STANDARD}`,
  };
  return isEditMode ? (
    <>
      {isMultiMode ? (
        <Button
          icon={faTrashAlt}
          hoverType={HOVER_TYPE.COLOR}
          onClick={handleDeleteMany}
          styles={buttonStyles}
        />
      ) : null}
      <Button
        icon={faTasks}
        hoverType={HOVER_TYPE.COLOR}
        styles={buttonStyles}
        onClick={() => toggleMultiMode()}
        isMultiMode={isMultiMode}
      />
      <Button
        icon={faTimes}
        hoverType={HOVER_TYPE.COLOR}
        onClick={initMode}
        styles={buttonStyles}
      />
    </>
  ) : (
    <Button
      icon={faEdit}
      hoverType={HOVER_TYPE.COLOR}
      onClick={() => setEditMode(true)}
      styles={buttonStyles}
    />
  );
};

ListEditMenu.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  toggleMultiMode: PropTypes.func.isRequired,
  initMode: PropTypes.func.isRequired,
  handleDeleteMany: PropTypes.func,
};
ListEditMenu.defaultProps = {
  handleDeleteMany: undefined,
};
export default ListEditMenu;
