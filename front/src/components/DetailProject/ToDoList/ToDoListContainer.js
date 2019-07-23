import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { unshift, deleteMany, deleteOne } from 'lib/manuArrData';
import { useDetailProjectFns } from 'store/DetailProject';
import ToDo from 'components/DetailProject/ToDo';
import moment from 'moment';
import { useListEditMenuValues } from 'store/DetailProject/ListEditMenu';
import EditMenuProvider from 'store/DetailProject/EditMenu';
import ToDoListProvider from 'store/DetailProject/ToDoList';
import ToDoProvider from 'store/DetailProject/ToDo';
import ToDoList from './ToDoList';

const ToDoListContainer = ({
  match: {
    params: { id: projectId },
  },
  createdAt,
  data = [],
}) => {
  const [toDoList, setToDoList] = useState(data);
  const { setToDoListByDate } = useDetailProjectFns();
  const { idsToDelete } = useListEditMenuValues();
  const isPreviousToDo = () => {
    const now = Number(moment().format('YYYYMMDD'));
    return now === Number(createdAt.replace(/-/g, ''))
      ? false
      : now >= Number(createdAt.replace(/-/g, ''));
  };
  const createToDo = titleRef => {
    if (!titleRef.current || !titleRef.current.value) return;
    const data = {
      title: titleRef.current.value,
    };
    data.createdAt = createdAt;
    axios({ url: `/me/toDo/create/${projectId}`, method: 'post', data })
      .then(res => {
        setToDoList(unshift(res.data));
      })
      .finally(() => {
        titleRef.current.value = '';
      });
  };
  const deleteManyToDo = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm(`총 ${idsToDelete.length} 개를 삭제하시겠습니까?`))
      return;
    axios({
      url: '/me/toDo/delete',
      data: idsToDelete,
      method: 'delete',
    }).then(() => setToDoList(deleteMany(idsToDelete)));
  };
  const deleteToDoList = () => {
    if (!window.confirm(`${createdAt} 삭제하시겠습니까?`)) return;
    axios({
      url: `/me/toDo/delete`,
      method: 'delete',
      data: data.map(_data => _data._id),
    }).then(() => {
      setToDoListByDate(deleteOne(createdAt));
    });
  };
  const mapToComponent = () =>
    toDoList.map(toDo => (
      <ToDoProvider data={toDo} key={toDo._id}>
        <EditMenuProvider>
          <ToDo data={toDo} />
        </EditMenuProvider>
      </ToDoProvider>
    ));

  return (
    <ToDoListProvider value={{ toDoList, fns: { setToDoList } }}>
      <ToDoList
        createdAt={createdAt}
        isPreviousToDo={isPreviousToDo}
        createToDo={createToDo}
        deleteManyToDo={deleteManyToDo}
        deleteToDoList={deleteToDoList}
      >
        {mapToComponent()}
      </ToDoList>
    </ToDoListProvider>
  );
};
ToDoListContainer.propTypes = {
  createdAt: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
ToDoListContainer.defaultProps = {
  createdAt: undefined,
  data: undefined,
};

export default withRouter(ToDoListContainer);
