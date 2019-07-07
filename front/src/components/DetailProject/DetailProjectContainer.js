import React from 'react';
import EditToDoList from 'components/DetailProject/EditToDoList';
import EditMenuProvider from 'store/Common/EditMenu';
import { useDetailProjectFns } from 'store/DetailProject';
import DetailProject from './DetailProject';

const DetailProjectContainer = () => {
  const { mapToComponent } = useDetailProjectFns();
  return (
    <DetailProject>
      <EditMenuProvider>
        {mapToComponent()}
        <EditToDoList />
      </EditMenuProvider>
    </DetailProject>
  );
};
export default DetailProjectContainer;
