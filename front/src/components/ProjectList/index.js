import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const ProjectList = ({ children }) => <Container>{children}</Container>;
export default ProjectList;
