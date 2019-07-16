import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';
import theme from 'styles/theme';

const EditContainer = styled.div`
  ${props => props.styles};
  ${props =>
    props.csstype === 'toDo'
      ? css`
          margin-left: 0.2rem;
        `
      : css`
          margin-left: ${props.theme.PADDING.STANDARD};
        `}
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const EditMenu = ({
  titleChangeMode,
  setTitleChangeMode,
  handleDelete,
  isEditMode,
  isMultiMode,
  csstype,
}) => {
  const buttonStyles = {
    height: '100%',
    padding: `0 ${theme.PADDING.STANDARD}`,
  };
  return isEditMode && !isMultiMode ? (
    <EditContainer csstype={csstype}>
      <Button
        icon={titleChangeMode ? faTimes : faPen}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        onClick={
          titleChangeMode
            ? () => setTitleChangeMode(false)
            : () => setTitleChangeMode(true)
        }
        styles={buttonStyles}
      />
      <Button
        icon={faTrashAlt}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        onClick={handleDelete}
        styles={buttonStyles}
      />
    </EditContainer>
  ) : null;
};
EditMenu.propTypes = {
  titleChangeMode: PropTypes.bool.isRequired,
  setTitleChangeMode: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  isEditMode: PropTypes.bool.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  csstype: PropTypes.string,
};
EditMenu.defaultProps = {
  handleDelete: undefined,
  csstype: undefined,
};
export default EditMenu;
