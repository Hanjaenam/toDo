import React, { useEffect } from 'react';
import { useStatus } from 'lib/hooks';
import axios from 'axios';
import ToDoListProvider, {
  useToDoListFns,
  useToDoListDatas,
} from 'store/DetailProject/ToDoList';
import EditMenuProvider from 'store/Common/EditMenu';
import ToDoList from './ToDoList';

const ToDoListContainer = ({ id }) => {
  const { loadData, mapToComponent } = useToDoListFns();
  const toDoListDatas = useToDoListDatas();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (toDoListDatas === undefined) {
      axios({
        url: `/toDo/read/${id}`,
        method: 'get',
      })
        .then(res => loadData(res.data))
        .catch(err => failure(err));
    }
  }, []);

  return (
    <ToDoList>
      {toDoListDatas === undefined || error ? null : mapToComponent()}
    </ToDoList>
  );
};
export default ({ id }) => (
  <ToDoListProvider>
    <EditMenuProvider>
      <ToDoListContainer id={id} />
    </EditMenuProvider>
  </ToDoListProvider>
);
