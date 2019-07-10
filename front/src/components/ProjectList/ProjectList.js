import React from 'react';
import styled from 'styled-components';
import EditMenuProvider from 'store/Common/EditMenu';
import Project from 'components/ProjectList/Project';

const Container = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: ${props => props.theme.BREAKPOINTS.LARGE};
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.LARGE}) {
    width: ${props => props.theme.BREAKPOINTS.MEDIUM};
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    width: 100%;
  }
`;
const ProjectList = ({ children }) => (
  <Container>
    <EditMenuProvider>
      <Project edit />
    </EditMenuProvider>
    {children}
  </Container>
);

export default ProjectList;
