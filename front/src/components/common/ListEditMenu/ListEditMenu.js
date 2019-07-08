import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faEdit,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { hover1 } from 'styles/mixins';

const Icon = styled(FontAwesomeIcon)`
  ${hover1}
  padding-left: 0.5rem;
  font-size: 1.5rem;
`;

const MultiModeIcon = styled(Icon)`
  &.isMultiMode {
    color: ${props => props.theme.PRIMARY()};
  }
`;

const ListEditMenu = ({
  isEditMode,
  isMultiMode,
  handleDeleteMany,
  initMode,
  toggleMultiMode,
  setEditMode,
}) =>
  isEditMode ? (
    <>
      {isMultiMode ? (
        <Icon icon={faTrashAlt} onClick={handleDeleteMany} />
      ) : null}
      <MultiModeIcon
        icon={faTasks}
        className={isMultiMode ? 'isMultiMode' : null}
        onClick={() => toggleMultiMode()}
      />
      <Icon icon={faTimes} onClick={initMode} />
    </>
  ) : (
    <Icon icon={faEdit} onClick={() => setEditMode(true)} />
  );

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
