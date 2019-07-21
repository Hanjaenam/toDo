import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  useDetailProjectFns,
  useDetailProjectValues,
} from 'store/DetailProject';
import { unshift, deleteMany } from 'lib/manuArrData';
import ToDo from 'components/DetailProject/ToDo';
import moment from 'moment';
import { useListEditMenuValues } from 'store/Common/ListEditMenu';
import EditMenuProvider from 'store/Common/EditMenu';
import ToDoListProvider from 'store/ToDoList';
import EditToDoList from './EditToDoList';

const ToDoListContainer = ({
  match: {
    params: { id: projectId },
  },
}) => {
  const [editToDoList, setEditToDoList] = useState([]);
  const { setDetailProject } = useDetailProjectFns();
  const { detailProject } = useDetailProjectValues();
  const { idsToDelete } = useListEditMenuValues();
  const isExistedTodayData = () =>
    detailProject.findIndex(
      data => data._id === moment(Date.now()).format('YYYY-MM-DD'),
    ) !== -1;
  const getTommorrowDay = () => {
    const date = new Date();
    return date.setDate(date.getDate() + 1);
  };
  const [selectedDay, setSelectedDay] = useState(
    isExistedTodayData() ? moment(getTommorrowDay())._d : moment()._d,
  );
  const generateId = () =>
    Math.random()
      .toString(36)
      .substr(2, 9);
  const createToDo = titleRef => {
    if (!titleRef.current || !titleRef.current.value) return;
    const data = {
      title: titleRef.current.value,
    };
    data._id = generateId();
    setEditToDoList(unshift(data));
    titleRef.current.value = '';
  };
  const deleteManyToDo = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm(`총 ${idsToDelete.length} 개를 삭제하시겠습니까?`))
      return;
    setEditToDoList(deleteMany(idsToDelete));
  };
  const createToDoList = () => {
    if (editToDoList.length === 0) return;
    if (
      !window.confirm(
        `${moment(selectedDay).format(
          'YYYY-MM-DD',
        )} 이 날짜로 할 일을 추가하시겠습니까?`,
      )
    )
      return;
    axios({
      url: `/me/toDo/create/${projectId}`,
      method: 'post',
      data: editToDoList.map(toDo => ({
        title: toDo.title,
        createdAt: selectedDay,
      })),
    })
      .then(res => {
        const data = {
          _id: moment(selectedDay).format('YYYY-MM-DD'),
          toDoList: res.data,
        };
        setDetailProject(unshift(data));
      })
      .finally(() => {
        setEditToDoList([]);
      });
  };

  const mapToComponent = () =>
    editToDoList.map(toDo => (
      <EditMenuProvider key={toDo._id}>
        <ToDo data={toDo} edit />
      </EditMenuProvider>
    ));
  return (
    <ToDoListProvider value={{ editToDoList, fns: { setEditToDoList } }}>
      <EditToDoList
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        createToDo={createToDo}
        deleteManyToDo={deleteManyToDo}
        createToDoList={createToDoList}
        isExistedTodayData={isExistedTodayData()}
      >
        {mapToComponent()}
      </EditToDoList>
    </ToDoListProvider>
  );
};
ToDoListContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ToDoListContainer);
