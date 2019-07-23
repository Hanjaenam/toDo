import React, { useState, useEffect } from 'react';
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
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/DetailProject/ListEditMenu';
import EditMenuProvider from 'store/DetailProject/EditMenu';
import ToDoListProvider from 'store/DetailProject/ToDoList';
import { useSelectedDay } from 'lib/hooks';
import { generateId } from 'lib/etc';
import ToDoProvider from 'store/DetailProject/ToDo';
import EditToDoList from './EditToDoList';

const ToDoListContainer = ({
  match: {
    params: { id: projectId },
  },
}) => {
  const [toDoList, setToDoList] = useState([]);
  const [toDoData, setToDoData] = useState({
    _id: generateId(),
    title: '',
    importance: 1,
    order: undefined,
  });
  const { setToDoListByDate } = useDetailProjectFns();
  const { toDoListByDate } = useDetailProjectValues();
  const { idsToDelete, isEditMode } = useListEditMenuValues();
  const { initMode } = useListEditMenuFns();
  const { selectedDay, setSelectedDay } = useSelectedDay({
    toDoListByDate,
  });
  useEffect(() => {
    if (toDoList.length === 0 && isEditMode) {
      initMode();
    }
  }, [toDoList.length]);
  const initToDo = () =>
    setToDoData({
      id: generateId(),
      title: '',
      importance: 1,
      order: undefined,
    });
  const createToDo = () => {
    if (toDoData.title === '') return;
    setToDoList(unshift(toDoData));
    initToDo();
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
        setToDoListByDate(unshift(data));
      })
      .finally(() => {
        setToDoList([]);
      });
  };
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      createToDo(toDoData);
    }
  };
  const handleChange = e => {
    const {
      target: { value },
    } = e;
    setToDoData(s => ({ ...s, title: value }));
  };
  const mapToComponent = () =>
    toDoList.map(toDo => (
      <ToDoProvider data={toDo} key={toDo._id}>
        <EditMenuProvider>
          <ToDo edit />
        </EditMenuProvider>
      </ToDoProvider>
    ));
  return (
    <ToDoListProvider value={{ toDoList, fns: { setToDoList } }}>
      <EditToDoList
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        createToDo={createToDo}
        deleteManyToDo={deleteManyToDo}
        createToDoList={createToDoList}
        isCreateMode={toDoData.title === ''}
        toDoListEmpty={toDoList.length === 0}
        handleKeyUp={handleKeyUp}
        title={toDoData.title}
        handleChange={handleChange}
        toDo={toDoData}
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
