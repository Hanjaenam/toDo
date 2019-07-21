import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    /* width: 95%; */
    width: ${props => props.theme.BREAKPOINTS.SMALL};
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    width: 100%;
  }
`;
const ProjectTemplate = ({ children }) => <Container>{children}</Container>;
export default ProjectTemplate;
