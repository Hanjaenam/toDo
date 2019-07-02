import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes } from 'styled-components';

const HomeAnimation = keyframes`
50%{
  transform:translateY(-3px);
}
100%{
  transform:translateY(0);
}
`;

const Container = styled.div`
  background-color: white;
  box-sizing: border-box;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  @media screen and (max-width: ${props => props.theme.breakpoints.header}) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const Center = styled.div`
  width: ${props => props.theme.breakpoints.header};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.breakpoints.header}) {
    width: 100%;
  }
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Icon = styled(FontAwesomeIcon)`
  opacity: 0.6;
  transition: 0.5s ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
    animation: ${HomeAnimation} 0.5s ease-in-out 0s infinite;
  }
`;
const Header = ({ children }) => (
  <Container>
    <Center>
      {children}
      {/* <Icon icon={faHome} size="2x" onClick={() => history.push('/')} /> */}
    </Center>
  </Container>
);

export default withRouter(Header);
