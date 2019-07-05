import React from 'react';
import { useProjectFns } from 'store/Project';
import EditToDoList from 'components/DetailProject/EditToDoList';
import EditMenuProvider from 'store/Common/EditMenu';
import DetailProject from './DetailProject';

const DetailProjectContainer = () => {
  const { mapToComponent } = useProjectFns();
  return (
    <DetailProject>
      <EditMenuProvider>
        {mapToComponent({ type: 'toDoList' })}
        <EditToDoList />
      </EditMenuProvider>
    </DetailProject>
  );
};
export default DetailProjectContainer;
