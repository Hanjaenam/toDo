import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditContainer = styled.div`
  background: white;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.RADIUS};
  overflow: hidden;
  border: 1px solid ${props => props.theme.PRIMARY()};
`;
const Icon = styled(FontAwesomeIcon)`
  height: 100%;
  width: 1rem !important;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: ${props => props.theme.TRANSITION};
  &:hover {
    color: white;
    background: ${props => props.theme.PRIMARY()};
  }
`;
const EditMenu = ({
  id,
  isMultiMode,
  isEditMode,
  isChangeTitleMode,
  setChangeTitleMode,
  handleDelete,
}) =>
  isEditMode && !isMultiMode ? (
    <EditContainer>
      <Icon
        icon={isChangeTitleMode ? faTimes : faPen}
        onClick={
          isChangeTitleMode
            ? () => setChangeTitleMode(false)
            : () => setChangeTitleMode(true)
        }
      />
      <Icon icon={faTrashAlt} onClick={() => handleDelete(id)} />
    </EditContainer>
  ) : null;
EditMenu.propTypes = {
  id: PropTypes.string.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isChangeTitleMode: PropTypes.bool.isRequired,
  setChangeTitleMode: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default EditMenu;
