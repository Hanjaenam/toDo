import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  border: 0.5rem solid transparent;
  border-bottom: none;
  padding-bottom: 0.5rem;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  align-items: flex-start;
  @media screen and (max-width: ${props => props.theme.breakpoints.small}) {
    display: block;
    border: none;
    -webkit-overflow-scrolling: touch;
  }
`;

const ToDoList = ({ children }) => {
  const containerRef = useRef();
  useEffect(() => {
    containerRef.current.scrollLeft = containerRef.current.scrollWidth;
  }, []);
  return <Container ref={containerRef}>{children}</Container>;
};
export default ToDoList;
