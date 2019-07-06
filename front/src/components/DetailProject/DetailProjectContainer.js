import React from 'react';
import EditToDoList from 'components/DetailProject/EditToDoList';
import EditMenuProvider from 'store/Common/EditMenu';
import DetailProject from './DetailProject';

const DetailProjectContainer = () => {
  return (
    <DetailProject>
      <EditMenuProvider>
        <EditToDoList />
      </EditMenuProvider>
    </DetailProject>
  );
};
export default DetailProjectContainer;
