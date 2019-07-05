import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.PRIMARY()};
  box-sizing: border-box;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.HEADER}) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const Center = styled.div`
  width: ${props => props.theme.BREAKPOINTS.HEADER};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.HEADER}) {
    width: 100%;
  }
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Header = ({ children }) => (
  <Container>
    <Center>{children}</Center>
  </Container>
);

export default withRouter(Header);
