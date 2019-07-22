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
  padding: ${props => props.theme.GAP.LARGE};
  box-sizing: border-box;
`;

const iconStyles = css`
  box-sizing: border-box;
  ${buttonStyles};
  p {
    transform: scale(1.5);
  }
`;

const iconTopRightRadiusStyles = css`
  box-sizing: border-box;
  ${buttonStyles};
  p {
    transform: scale(1.5);
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
`;

const ListEditMenu = ({
  isEditMode,
  isMultiMode,
  setEditMode,
  toggleMultiMode,
  initMode,
  handleDeleteMany,
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
