import React from 'react';
import { useProjectFns } from 'store/Project';
import AddToDoList from 'components/DetailProject/AddToDoList';
import AddToDoListProvider from 'store/DetailProject/AddToDoList';
import Project from './DetailProject';

const DetailProjectContainer = () => {
  const { mapToComponent } = useProjectFns();
  return (
    <Project>
      {/* {mapToComponent({ type: 'toDoList' })} */}
      {/* <AddToDoList /> */}
      <AddToDoListProvider>
        <AddToDoList />
      </AddToDoListProvider>
    </Project>
  );
};
export default DetailProjectContainer;
