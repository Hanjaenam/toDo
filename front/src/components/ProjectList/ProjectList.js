import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  /* padding-top: 0; */
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: ${props => props.theme.BREAKPOINTS.LARGE};
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.LARGE}) {
    width: 100%;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-gap: 0.3rem;
`;
const ProjectList = ({ children, EditProject }) => (
  <Container>
    {EditProject}
    <Grid>{children}</Grid>
  </Container>
);
export default ProjectList;
