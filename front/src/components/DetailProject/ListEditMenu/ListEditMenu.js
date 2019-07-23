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
  box-sizing: border-box;
`;

const buttonStyles = css`
  /* border-radius: 0; */
  padding: ${props => props.theme.GAP.MEDIUM};
  box-sizing: border-box;
`;

const iconStyles = css`
  box-sizing: border-box;
  ${buttonStyles};
  p {
    font-size: 1.5rem;
  }
`;

const iconTopRightRadiusStyles = css`
  box-sizing: border-box;
  ${buttonStyles};
  p {
    font-size: 1.5rem;
  }
  border-top-right-radius: ${props => props.theme.RADIUS};
`;

const topRightRadiusStyles = css`
  box-sizing: border-box;
  ${buttonStyles};
  padding: ${props => props.theme.GAP.MEDIUM};
  border-radius: 0;
  border-top-right-radius: ${props => props.theme.RADIUS};
  border-left: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
`;

const ListEditMenu = ({
  isEditMode,
  isMultiMode,
  setEditMode,
  toggleMultiMode,
  initMode,
  handleDeleteMany,
  disabled,
}) => {
  return isEditMode ? (
    <ButtonContainer>
      {isMultiMode ? (
        <Button
          icon={faTrashAlt}
          hoverType={HOVER_TYPE.BACKGROUND_COLOR}
          onClick={handleDeleteMany}
          styles={iconStyles}
        />
      ) : null}
      <Button
        icon={faTasks}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        hoverOpts={{ active: isMultiMode }}
        onClick={() => toggleMultiMode()}
        styles={iconStyles}
      />
      <Button
        icon={faTimes}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        onClick={initMode}
        styles={iconTopRightRadiusStyles}
      />
    </ButtonContainer>
  ) : (
    <Button
      hoverType={HOVER_TYPE.BACKGROUND_COLOR}
      onClick={() => setEditMode(true)}
      styles={topRightRadiusStyles}
      disabled={disabled}
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
  disabled: PropTypes.bool,
};
ListEditMenu.defaultProps = {
  handleDeleteMany: undefined,
  disabled: undefined,
};
export default ListEditMenu;
