import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PaginationContainer from 'containers/Common/PaginationContainer';

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const ProjectList = ({ children, lastPage, page }) => (
  <Container>
    {children}
    <PaginationContainer lastPage={lastPage} page={page} />
  </Container>
);

ProjectList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  lastPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default ProjectList;
