import React from 'react';
import styled from 'styled-components';
import EditMenuProvider from 'store/Common/EditMenu';
import Project from 'components/ProjectList/Project';

const Container = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 95%;
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
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
