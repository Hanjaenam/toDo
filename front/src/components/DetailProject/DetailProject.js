import React from 'react';
import styled from 'styled-components';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import ToDoList from 'components/DetailProject/ToDoList';

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
  overflow-x: scroll;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    display: block;
    -webkit-overflow-scrolling: touch;
    /* flex-direction: column-reverse; */
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    padding: 0;
  }
  /* grid-auto-flow: column dense; */
  /* display: flex; */
  display: grid;
  grid-auto-flow: column;
  align-items: flex-start;
  grid-gap: ${props => props.theme.GAP.TO_DO_LIST};
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
