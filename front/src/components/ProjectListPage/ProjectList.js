import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const ProjectList = ({ children }) => <Container>{children}</Container>;

ProjectList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProjectList;
