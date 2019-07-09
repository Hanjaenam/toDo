import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.PRIMARY()};
  box-sizing: border-box;
  ${props => {
    switch (props.page) {
      case 'projectList':
        return css`
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        `;
      case 'detailProject':
        return css`
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
        `;
      default:
        return null;
    }
  }}
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.HEADER}) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;
const Center = styled.div`
  width: ${props => props.theme.BREAKPOINTS.HEADER};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.HEADER}) {
    width: 100%;
  }
  ${props => {
    switch (props.page) {
      case 'projectList':
        return css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
        `;
      case 'detailProject':
        return css`
          display: flex;
          align-items: center;
        `;
      default:
        return null;
    }
  }}
`;

const Header = ({ children, page }) => (
  <Container page={page}>
    <Center page={page}>{children}</Center>
  </Container>
);

export default Header;
