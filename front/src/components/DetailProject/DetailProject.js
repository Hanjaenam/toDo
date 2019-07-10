import React from 'react';
import styled from 'styled-components';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import ToDoList from 'components/DetailProject/ToDoList';

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
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    padding: 0;
  }
`;

const Project = ({ children }) => (
  <Container>
    <ListEditMenuProvider>
      <ToDoList edit />
    </ListEditMenuProvider>
    {children}
  </Container>
);
export default Project;
