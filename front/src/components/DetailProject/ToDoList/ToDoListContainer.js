import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDetailProjectFns } from 'pages/DetailProject';
import { unshift, deleteMany, deleteOne } from 'lib/manuArrData';
import ToDo from 'components/DetailProject/ToDo';
import moment from 'moment';
import { useListEditMenuValues } from 'store/Common/ListEditMenu';
import ToDoList from './ToDoList';

const ToDoListContainer = ({
  createdAt,
  data,
  match: {
    params: { id },
  },
}) => {
  const [toDoList, setToDoList] = useState(data);
  const { setDetailProject } = useDetailProjectFns();
  const { idsToDelete } = useListEditMenuValues();
  const checkPreviousToDo = () => {
    const now = Number(moment(Date.now()).format('YYYYMMDD'));
    return now === Number(createdAt.replace(/-/g, ''))
      ? false
      : now >= Number(createdAt.replace(/-/g, ''));
  };
  const createToDo = titleRef => {
    if (!titleRef.current || !titleRef.current.value) return;
    const _data = {
      title: titleRef.current.value,
      createdAt,
    };
    axios({
      url: `/me/toDo/create/${id}`,
      method: 'post',
      data: _data,
    }).then(res => {
      setToDoList(unshift(res.data));
      titleRef.current.value = '';
    });
  };
  const deleteToDoList = () => {
    if (!window.confirm(`${createdAt} 삭제하시겠습니까?`)) return;
    axios({
      url: `/me/toDo/delete`,
      method: 'DELETE',
      data: data.map(_data => _data._id),
    }).then(() => {
      setDetailProject(deleteOne(createdAt));
    });
  };
  const handleDeleteMany = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm(`총 ${idsToDelete.length} 개를 삭제하시겠습니까?`))
      return;
    axios({
      url: '/me/toDo/delete',
      data: idsToDelete,
      method: 'delete',
    }).then(() => {
      setToDoList(deleteMany(idsToDelete));
    });
  };
  const mapToComponent = () =>
    toDoList.map(toDo => (
      <ToDo
        id={toDo._id}
        key={toDo._id}
        data={toDo}
        setToDoList={setToDoList}
      />
    ));
  return (
    <ToDoList
      createdAt={createdAt}
      deleteToDoList={deleteToDoList}
      createToDo={createToDo}
      handleDeleteMany={handleDeleteMany}
      checkPreviousToDo={checkPreviousToDo}
    >
      {mapToComponent()}
    </ToDoList>
  );
};
ToDoListContainer.propTypes = {
  createdAt: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default withRouter(ToDoListContainer);
