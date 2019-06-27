import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  overflow: scroll;
  @media screen and (max-width: ${props => props.theme.breakpoints.small}) {
    display: block;
    border: none;
    padding: 1rem;
    -webkit-overflow-scrolling: touch;
  }
  border: 1rem solid transparent;
`;

const ToDoListView = ({ children }) => <Container>{children}</Container>;
export default ToDoListView;
