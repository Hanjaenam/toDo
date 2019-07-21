import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import {
  faTasks,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { HOVER_TYPE } from 'styles/mixins';
import Button from 'components/Common/Button';

const ButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${props => props.theme.GAP.SMALL};
`;

const buttonStyles = ({ icon = true, page } = {}) => css`
  ${props =>
    icon
      ? css`
          svg {
            transform: scale(1.5);
          }
        `
      : null}
  ${props =>
    page === 'notEditToDoList'
      ? css`
          &.e {
            border-top-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
          }
        `
      : css`
          border: 1px solid ${props => props.theme.BORDER.NOT_FOCUS};
        `};
  padding: ${props => props.theme.GAP.MEDIUM};
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
    <ButtonContainer>
      {isMultiMode ? (
        <Button
          icon={faTrashAlt}
          hoverType={HOVER_TYPE.BACKGROUND_COLOR}
          onClick={handleDeleteMany}
          styles={buttonStyles({ page })}
        />
      ) : null}
      <Button
        icon={faTasks}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles({ page })}
        onClick={() => toggleMultiMode()}
        hoverOpts={{ active: isMultiMode }}
      />
      <Button
        icon={faTimes}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        onClick={initMode}
        styles={buttonStyles({ page })}
      />
    </ButtonContainer>
  ) : (
    <Button
      className="e"
      hoverType={HOVER_TYPE.BACKGROUND_COLOR}
      onClick={() => setEditMode(true)}
      styles={buttonStyles({ icon: false, page })}
    >
      수정
    </Button>
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
