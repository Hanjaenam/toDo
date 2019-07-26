import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import StarButtonContainer from 'containers/Common/StarButtonContainer';

const Container = styled.div`
  background: gray;
  button[disabled] {
    background-color: transparent;
    > svg {
      color: ${props => props.theme.COLOR.STAR()};
    }
  }
`;

const Center = styled.div`
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 100%;
  }
  padding: 1.5rem ${props => props.theme.GAP.ONE};
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const LockIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
`;

const Title = styled.p`
  font-size: 1.3rem;
`;

const Project = ({ projectData: { isPublic, importance, title } }) => (
  <Container>
    <Center>
      <LockIcon icon={isPublic ? faLockOpen : faLock} />
      <Title>{title}</Title>
      <StarButtonContainer />
    </Center>
  </Container>
);
export default Project;
