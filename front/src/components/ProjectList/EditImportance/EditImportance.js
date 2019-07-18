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
  padding: ${props => props.theme.GAP.TINY};
  font-size: 1.1rem;
`;
const EditImportance = ({ importance, patchProject }) => {
  return (
    <Container>
      {new Array(importance).fill('').map((_, idx) => (
        <StarIcon
          key={`star${idx}`}
          icon={faStar}
          gray={(importance < 3 - idx).toString()}
          onClick={() => patchProject(3 - idx)}
        />
      ))}
    </Container>
  );
};
export default EditImportance;
