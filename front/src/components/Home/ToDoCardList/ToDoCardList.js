import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  @media screen and (max-width: ${props => props.theme.breakpoints.wide}) {
    width: 100%;
  }
`;
const ToDoCardList = ({ children }) => <Container>{children}</Container>;
export default ToDoCardList;
