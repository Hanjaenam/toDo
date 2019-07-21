import React from 'react';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import EditToDoList from 'components/DetailProject/EditToDoList';
import PageTemplate from 'components/Common/PageTemplate';

const DetailProject = ({ children }) => {
  return (
    <PageTemplate>
      <ListEditMenuProvider>
        <EditToDoList />
      </ListEditMenuProvider>
      {children}
    </PageTemplate>
  );
};

export default DetailProject;
