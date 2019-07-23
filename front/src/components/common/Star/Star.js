import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.RADIUS};
  overflow: hidden;
  ${props =>
    props.isEditMode
      ? css`
          border: 1px solid ${props.theme.COLOR.NOT_FOCUSED.BORDER()};
        `
      : null}
`;

const btnStyles = css`
  > p {
    color: ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  }
  &.yellow {
    > p {
      color: ${props => props.theme.COLOR.STAR()} !important;
    }
  }
  &.edit {
    cursor: pointer;
  }
`;
const Star = ({
  importance,
  hoverImportance,
  isEditMode,
  styles,
  handleMouseEnter,
  handleMouseLeave,
  setImportance,
}) => {
  const getYellow = idx => {
    if (isEditMode) {
      return hoverImportance > idx ? 'yellow' : '';
    }
    return importance > idx ? 'yellow' : '';
  };
  return (
    <Container isEditMode={isEditMode}>
      {new Array(isEditMode ? 3 : importance).fill('').map((_, idx) => (
        <Button
          key={`star${idx}`}
          className={`${isEditMode ? 'edit' : ''} ${getYellow(idx)}`}
          icon={faStar}
          styles={[...btnStyles, ...styles]}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
          onClick={
            isEditMode
              ? () => {
                  setImportance(idx + 1);
                }
              : undefined
          }
        />
      ))}
    </Container>
  );
};

Star.propTypes = {
  importance: PropTypes.number.isRequired,
  styles: PropTypes.array,
  hoverImportance: PropTypes.number.isRequired,
  isEditMode: PropTypes.bool,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  setImportance: PropTypes.func,
};

Star.defaultProps = {
  styles: [],
  isEditMode: undefined,
  setImportance: undefined,
};
export default Star;
