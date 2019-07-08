import React from 'react';
import EditToDoList from 'components/DetailProject/EditToDoList';
import EditMenuProvider from 'store/Common/EditMenu';
import { useDataFns } from 'store/Common/Data';
import DetailProject from './DetailProject';

const DetailProjectContainer = () => {
  const { mapToComponent } = useDataFns();
  return (
    <DetailProject>
      {mapToComponent({ type: 'detailProject' })}
      <EditMenuProvider>
        <EditToDoList />
      </EditMenuProvider>
    </DetailProject>
  );
};
export default DetailProjectContainer;
