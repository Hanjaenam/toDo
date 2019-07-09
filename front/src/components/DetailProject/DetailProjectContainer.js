import React from 'react';
import EditToDoList from 'components/DetailProject/EditToDoList';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import { useDetailProjectValues } from 'pages/DetailProject';
import ToDoList from 'components/DetailProject/ToDoList';
import DetailProject from './DetailProject';

const DetailProjectContainer = () => {
  const { detailProject } = useDetailProjectValues();
  const mapToComponent = () =>
    detailProject.map(({ toDoList, _id }) => (
      <ListEditMenuProvider key={_id}>
        <ToDoList data={toDoList} createdAt={_id} />
      </ListEditMenuProvider>
    ));
  return (
    <DetailProject>
      <ListEditMenuProvider>
        <EditToDoList />
      </ListEditMenuProvider>
      {mapToComponent()}
    </DetailProject>
  );
};
export default DetailProjectContainer;
