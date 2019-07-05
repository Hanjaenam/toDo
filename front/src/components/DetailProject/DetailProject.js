import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  align-items: flex-start;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    display: block;
    -webkit-overflow-scrolling: touch;
  }
`;

const Project = ({ children }) => {
  const containerRef = useRef();
  useEffect(() => {
    containerRef.current.scrollLeft = containerRef.current.scrollWidth;
  }, []);
  return <Container ref={containerRef}>{children}</Container>;
};
export default Project;
