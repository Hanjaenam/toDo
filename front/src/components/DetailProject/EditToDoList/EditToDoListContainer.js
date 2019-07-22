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
import { useSelectedDay } from 'lib/hooks';
import EditToDoList from './EditToDoList';

const ToDoListContainer = ({
  match: {
    params: { id: projectId },
  },
}) => {
  const [toDoList, setToDoList] = useState([]);
  const { setDetailProject } = useDetailProjectFns();
  const { detailProject } = useDetailProjectValues();
  const { idsToDelete } = useListEditMenuValues();
  const { selectedDay, setSelectedDay } = useSelectedDay({
    detailProject,
  });
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
    setToDoList(unshift(data));
    titleRef.current.value = '';
  };
  const deleteManyToDo = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm(`총 ${idsToDelete.length} 개를 삭제하시겠습니까?`))
      return;
    setToDoList(deleteMany(idsToDelete));
  };
  const createToDoList = () => {
    if (toDoList.length === 0) return;
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
      data: toDoList.map(toDo => ({
        title: toDo.title,
        createdAt: selectedDay,
      })),
    })
      .then(res => {
        const data = {
          _id: moment(res.data[0].createdAt).format('YYYY-MM-DD'),
          toDoList: res.data,
        };
        setDetailProject(unshift(data));
      })
      .finally(() => {
        setToDoList([]);
      });
  };

  const mapToComponent = () =>
    toDoList.map(toDo => (
      <EditMenuProvider key={toDo._id}>
        <ToDo data={toDo} edit />
      </EditMenuProvider>
    ));
  return (
    <ToDoListProvider value={{ toDoList, fns: { setToDoList } }}>
      <EditToDoList
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        createToDo={createToDo}
        deleteManyToDo={deleteManyToDo}
        createToDoList={createToDoList}
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
