import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.GAP.MEDIUM} 0;
`;

const Pagination = ({ children }) => <Container>{children}</Container>;

Pagination.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Pagination;
