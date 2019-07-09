import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  padding: 1rem;
  /* grid-auto-flow: column dense; */
  overflow-x: scroll;
  align-items: flex-start;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    /* flex-direction: column-reverse; */
    display: block;
    -webkit-overflow-scrolling: touch;
  }
`;

const Project = ({ children }) => <Container>{children}</Container>;
export default Project;
