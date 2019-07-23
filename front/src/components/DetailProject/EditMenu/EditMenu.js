import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';
import Star from 'components/Common/Star';

const EditContainer = styled.div`
  ${props =>
    props.csstype === 'toDo'
      ? null
      : css`
          margin-left: ${props.theme.GAP.MEDIUM};
        `}
  display:grid;
  grid-auto-flow: column;
  grid-gap: ${props => props.theme.GAP.SMALL};
  margin: ${props => props.theme.GAP.SMALL} 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const buttonStyles = css`
  padding: ${props => props.theme.GAP.MEDIUM};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
`;
const starStyles = css`
  padding: ${props => props.theme.GAP.MEDIUM};
`;

const EditMenu = ({
  handleDelete,
  csstype,
  textChangeMode,
  toggleTextChangeMode,
  create,
  toDo,
  setToDo,
}) => (
  <EditContainer csstype={csstype}>
    {create ? null : (
      <Button
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        onClick={toggleTextChangeMode}
        styles={buttonStyles}
      >
        {textChangeMode ? '취소' : '이름변경'}
      </Button>
    )}
    <Star
      isEditMode
      importance={toDo.importance}
      setImportance={importance => setToDo(s => ({ ...s, importance }))}
      styles={starStyles}
    />
    <Button hoverType={HOVER_TYPE.BACKGROUND_COLOR} styles={buttonStyles}>
      우선순위
    </Button>
    {create ? null : (
      <Button
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        onClick={handleDelete}
        styles={buttonStyles}
      >
        삭제
      </Button>
    )}
  </EditContainer>
);

EditMenu.propTypes = {
  handleDelete: PropTypes.func,
  csstype: PropTypes.string,
  textChangeMode: PropTypes.bool,
  toggleTextChangeMode: PropTypes.func.isRequired,
  create: PropTypes.bool,
};
EditMenu.defaultProps = {
  handleDelete: undefined,
  textChangeMode: undefined,
  csstype: undefined,
  create: undefined,
};
export default EditMenu;
