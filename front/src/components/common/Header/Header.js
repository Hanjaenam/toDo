import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.PRIMARY()};
  box-sizing: border-box;
  ${props =>
    props.page === 'projectList'
      ? css`
          padding-top: ${props => props.theme.GAP.STANDARD};
          padding-bottom: ${props => props.theme.GAP.STANDARD};
        `
      : css`
          padding-top: ${props => props.theme.GAP.SMALL};
          padding-bottom: ${props => props.theme.GAP.SMALL};
        `}
`;
const Center = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 95%;
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    width: 99%;
  }
  ${props =>
    props.page === 'projectList'
      ? css`
          justify-content: space-between;
        `
      : null};
  display: flex;
  align-items: center;
`;

const Header = ({ children, page }) => (
  <Container page={page}>
    <Center page={page}>{children}</Center>
  </Container>
);

export default Header;
