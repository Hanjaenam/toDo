import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Pagination = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Pagination;
