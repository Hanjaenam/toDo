import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditContainer = styled.div`
  ${props =>
    props.cssType === 'toDo'
      ? css`
          margin-left: 0.2rem;
        `
      : css`
          margin-left: 0.5rem;
        `}
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Icon = styled(FontAwesomeIcon)`
  /* width: 1rem !important; */
  height: 100%;
  ${props =>
    props.times
      ? css`
          font-size: 1.5rem;
        `
      : null};
  border-radius: ${props => props.theme.RADIUS};
  padding: 0 0.5rem;
  cursor: pointer;
  transition: background-color ${props => props.theme.TRANSITION};
  &:hover {
    color: white;
    background: ${props => props.theme.PRIMARY()};
  }
  &:active {
    transform: scale(0.9);
  }
`;
const EditMenu = ({
  id,
  isMultiMode,
  isEditMode,
  isChangeTitleMode,
  setChangeTitleMode,
  handleDelete,
  isCompleted,
  ...rest
}) => {
  if (isCompleted) {
    return (
      <EditContainer cssType={rest.cssType}>
        <Icon icon={faTimes} cssType={rest.cssType} times />
      </EditContainer>
    );
  }
  if (isEditMode && !isMultiMode) {
    return (
      <EditContainer cssType={rest.cssType}>
        <Icon
          icon={isChangeTitleMode ? faTimes : faPen}
          cssType={rest.cssType}
          times={isChangeTitleMode}
          onClick={
            isChangeTitleMode
              ? () => setChangeTitleMode(false)
              : () => setChangeTitleMode(true)
          }
        />
        <Icon
          icon={faTrashAlt}
          cssType={rest.cssType}
          onClick={() => handleDelete(id)}
        />
      </EditContainer>
    );
  }
  return null;
};
EditMenu.propTypes = {
  id: PropTypes.string,
  isMultiMode: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isChangeTitleMode: PropTypes.bool.isRequired,
  setChangeTitleMode: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  isCompleted: PropTypes.bool.isRequired,
};
EditMenu.defaultProps = {
  //------
  id: undefined,
  handleDelete: undefined,
  //------
};
export default EditMenu;
