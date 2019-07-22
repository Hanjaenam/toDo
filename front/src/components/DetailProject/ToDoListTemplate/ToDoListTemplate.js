import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  border-radius: ${props => props.theme.RADIUS};
  background: white;
  flex-shrink: 0;
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  margin: 0 auto;
  width: ${props => props.theme.BREAKPOINTS.SMALL};
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    width: 100%;
    border-radius: 0;
  }
`;

const DataContainer = styled.div`
  /* 여기서 padding을 주면 toDo 배경색이 짤린다.*/
  /* padding-left: 0.5rem; */
  > div:last-child {
    border-bottom-left-radius: ${props => props.theme.RADIUS};
    border-bottom-right-radius: ${props => props.theme.RADIUS};
    overflow: hidden;
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    > div:last-child {
      border-radius: 0;
    }
  }
`;

const ToDoList = ({ calendar, edit, children }) => {
  return (
    <Container>
      {calendar}
      {edit}
      <DataContainer>{children}</DataContainer>
    </Container>
  );
};

export default ToDoList;
