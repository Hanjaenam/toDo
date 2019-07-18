import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import ToDoList from 'components/DetailProject/ToDoList';

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
  overflow-x: scroll;
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    display: block;
    -webkit-overflow-scrolling: touch;
    /* flex-direction: column-reverse; */
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    padding: 0;
  }
  /* grid-auto-flow: column dense; */
`;

const DetailProject = ({ children, containerRef }) => {
  return (
    <Container ref={containerRef}>
      <ListEditMenuProvider>
        <ToDoList edit />
      </ListEditMenuProvider>
      {children}
    </Container>
  );
};

DetailProject.propTypes = {
  containerRef: PropTypes.shape({}).isRequired,
};
export default DetailProject;
