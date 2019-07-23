import React from 'react';
import ListEditMenuProvider from 'store/DetailProject/ListEditMenu';
import { useDetailProjectValues } from 'store/DetailProject';
import ToDoList from 'components/DetailProject/ToDoList';
import DetailProject from './DetailProject';

const DetailProjectContainer = () => {
  const { toDoListByDate } = useDetailProjectValues();

  const mapToComponent = () =>
    toDoListByDate.map(({ toDoList, _id }) => (
      <ListEditMenuProvider key={_id}>
        <ToDoList data={toDoList} createdAt={_id} />
      </ListEditMenuProvider>
    ));
  return <DetailProject>{mapToComponent()}</DetailProject>;
};
export default DetailProjectContainer;
