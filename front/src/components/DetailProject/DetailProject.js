import React from 'react';
import styled from 'styled-components';
import ListEditMenuProvider from 'store/DetailProject/ListEditMenu';
import EditToDoList from 'components/DetailProject/EditToDoList';
import EditProject from 'components/DetailProject/EditProject';

export const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.ONE};
`;

const DetailProject = ({ children }) => {
  return (
    <Container>
      <EditProject />
      <ListEditMenuProvider>
        <EditToDoList />
      </ListEditMenuProvider>
      {children}
    </Container>
  );
};

export default DetailProject;
