import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: ${props => props.theme.BREAKPOINTS.LARGE};
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.LARGE}) {
    width: ${props => props.theme.BREAKPOINTS.MEDIUM};
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    width: 100%;
  }
`;
const ProjectList = ({ children, EditProject }) => (
  <Container>
    {EditProject}
    {children}
  </Container>
);

ProjectList.propTypes = {
  EditProject: PropTypes.shape({}).isRequired,
};
export default ProjectList;
