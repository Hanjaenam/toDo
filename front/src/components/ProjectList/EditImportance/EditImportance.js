import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  grid-column: 2;
  ${props => (props.isEditMode ? css`` : null)}
  display:flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
`;

const StarIcon = styled(FontAwesomeIcon)`
  color: rgb(253, 216, 53);
  padding: 0.1rem;
  font-size: 1.1rem;
  ${props => {
    if (props.iseditmode === 'true') {
      return css`
        cursor: pointer;
        ${props.gray === 'true'
          ? css`
              color: rgb(223, 230, 233);
            `
          : null}
        &:hover {
          &,
          & ~ svg {
            color: ${props.color === 'true'
              ? 'rgb(223, 230, 233)'
              : 'rgb(253, 216, 53)'};
          }
        }
        &:active {
          &,
          & ~ svg {
            transform: scale(0.9);
          }
        }
      `;
    }
  }}
`;
const EditImportance = ({ isEditMode, importance, patchProject }) => {
  return (
    <Container isEditMode={isEditMode}>
      {new Array(isEditMode ? 3 : importance).fill('').map((_, idx) => (
        <StarIcon
          key={`star${idx}`}
          icon={faStar}
          iseditmode={isEditMode.toString()}
          gray={(importance < 3 - idx).toString()}
          onClick={() => patchProject(3 - idx)}
        />
      ))}
    </Container>
  );
};
export default EditImportance;
