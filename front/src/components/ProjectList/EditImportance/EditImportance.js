import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  grid-column: 2;
  text-align: center;
  ${props => (props.isEditMode ? css`` : null)}
  display:flex;
  flex-direction: row-reverse;
`;

const StarIcon = styled(FontAwesomeIcon)`
  ${props => {
    if (props.iseditmode === 'true') {
      return css`
        cursor: pointer;
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
  ${props =>
    props.color === 'true'
      ? css`
          color: rgb(253, 216, 53);
        `
      : css`
          color: rgb(223, 230, 233);
        `};
  padding: 0.1rem;
  font-size: 1.1rem;
`;
const EditImportance = ({ isEditMode, importance, patchProject }) => {
  return (
    <Container isEditMode={isEditMode}>
      {new Array(3).fill('').map((_, idx) => (
        <StarIcon
          key={`star${idx}`}
          icon={faStar}
          iseditmode={isEditMode.toString()}
          color={(2 - idx <= importance).toString()}
          onClick={() => patchProject(2 - idx)}
        />
      ))}
    </Container>
  );
};
export default EditImportance;
