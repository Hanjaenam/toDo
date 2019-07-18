import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.GAP.MEDIUM} 0;
`;

const Pagination = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Pagination;
