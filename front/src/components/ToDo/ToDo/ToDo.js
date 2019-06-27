import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  width: 400px;
  border: 1px solid black;
  border-radius: ${props => props.theme.RADIUS};
  @media screen and (max-width: ${props => props.theme.breakpoints.small}) {
    /*
    height 일부러 안잡아준 것.
    */
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  flex-shrink: 0;
  margin-right: 1rem;
  padding: 1rem;
`;
const ToDo = () => <Container />;

export default ToDo;
