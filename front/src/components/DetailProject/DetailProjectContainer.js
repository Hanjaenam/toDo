import React from 'react';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import { useDetailProjectValues } from 'pages/DetailProject';
import ToDoList from 'components/DetailProject/ToDoList';
import DetailProject from './DetailProject';

const DetailProjectContainer = () => {
  const { detailProject } = useDetailProjectValues();
  const mapToComponent = () =>
    detailProject.map(({ toDoList, _id }) => (
      <ListEditMenuProvider key={_id}>
        <ToDoList key={_id} data={toDoList} createdAt={_id} />
      </ListEditMenuProvider>
    ));
  return <DetailProject>{mapToComponent()}</DetailProject>;
};
export default DetailProjectContainer;
