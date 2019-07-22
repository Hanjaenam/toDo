import React from 'react';
import styled, { css } from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';

const Container = styled.div`
  /* grid-column: 2; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const btnStyles = css`
  color: ${props => props.theme.COLOR.STAR()};
  padding: ${props => props.theme.GAP.TINY};
  & + & {
    margin-left: ${props => props.theme.GAP.TINY};
  }
  font-size: 1.4rem;
  transition: ${props => props.theme.TRANSITION};
  border-radius: ${props => props.theme.RADIUS};
  &.edit {
    border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
    cursor: pointer;
    &:active {
    }
    ${props => {
      if (props.editYellow) {
        return css`
          color: ${props.theme.COLOR.STAR()};
          border-color: ${props.theme.COLOR.PRIMARY()};
        `;
      }
      return css`
        color: ${props.theme.COLOR.NOT_FOCUSED.BORDER()};
      `;
    }}
  }
`;
const Star = ({
  importance,
  isEditMode,
  styles = [],
  handleMouseEnter,
  handleMouseLeave,
  changeImportance,
  onConfirm,
}) => {
  return (
    <Container>
      {new Array(isEditMode ? 3 : importance).fill('').map((_, idx) => (
        <Button
          key={`star${idx}`}
          hoverType={HOVER_TYPE.COLOR}
          className={isEditMode ? 'edit' : ''}
          icon={faStar}
          editYellow={changeImportance > idx}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            onConfirm(idx + 1);
          }}
          styles={[...btnStyles, ...styles]}
        />
      ))}
    </Container>
  );
};
export default Star;
