import React from 'react';
import PropTypes from 'prop-types';
import {
  faTasks,
  faEdit,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-components';
import { HOVER_TYPE } from 'styles/mixins';
import Button from 'components/Common/Button';

const buttonStyles = page => css`
  font-size: 1.5rem;
  ${props =>
    page === 'toDoList'
      ? `padding:${props.theme.GAP.SMALL};`
      : `padding:${props.theme.GAP.MEDIUM};`}
`;

const ListEditMenu = ({
  isEditMode,
  isMultiMode,
  setEditMode,
  toggleMultiMode,
  initMode,
  handleDeleteMany,
  page,
}) => {
  return isEditMode ? (
    <>
      {isMultiMode ? (
        <Button
          icon={faTrashAlt}
          hoverType={HOVER_TYPE.COLOR}
          onClick={handleDeleteMany}
          styles={buttonStyles(page)}
        />
      ) : null}
      <Button
        icon={faTasks}
        hoverType={HOVER_TYPE.COLOR}
        styles={buttonStyles(page)}
        onClick={() => toggleMultiMode()}
        isMultiMode={isMultiMode}
      />
      <Button
        icon={faTimes}
        hoverType={HOVER_TYPE.COLOR}
        onClick={initMode}
        styles={buttonStyles(page)}
      />
    </>
  ) : (
    <Button
      icon={faEdit}
      hoverType={HOVER_TYPE.COLOR}
      onClick={() => setEditMode(true)}
      styles={buttonStyles(page)}
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
  page: PropTypes.string,
};
ListEditMenu.defaultProps = {
  handleDeleteMany: undefined,
  page: undefined,
};
export default ListEditMenu;
