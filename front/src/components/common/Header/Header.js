import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.PRIMARY()};
  box-sizing: border-box;
  ${props => {
    switch (props.page) {
      case 'projectList':
        return css`
          padding-top: ${props.theme.PADDING.STANDARD};
          padding-bottom: ${props.theme.PADDING.STANDARD};
        `;
      case 'detailProject':
        return css`
          padding-top: ${props.theme.PADDING.SMALL};
          padding-bottom: ${props.theme.PADDING.SMALL};
        `;
      default:
        return null;
    }
  }}
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.HEADER}) {
    padding-left: ${props => props.theme.PADDING.STANDARD};
    padding-right: ${props => props.theme.PADDING.STANDARD};
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
