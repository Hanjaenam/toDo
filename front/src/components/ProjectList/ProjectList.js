import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  padding-top: 0;
  width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  display: grid;
  grid-gap: 0.5rem;
  @media screen and (max-width: ${props => props.theme.breakpoints.wide}) {
    width: ${props => props.theme.breakpoints.large};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.large}) {
    width: 100%;
  }
`;
const ProjectList = ({ children }) => <Container>{children}</Container>;
export default ProjectList;
