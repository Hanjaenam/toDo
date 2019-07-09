import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { useListEditMenuValues } from 'store/Common/ListEditMenu';
import axios from 'axios';
import { push, unshift, deleteMany } from 'lib/manuArrData';
import { useDetailProjectFns } from 'pages/DetailProject';
import ToDo from 'components/DetailProject/ToDo';
import EditToDoList from './EditToDoList';

const EditToDoContainer = ({
  match: {
    params: { title },
  },
}) => {
  const { setDetailProject } = useDetailProjectFns();
  const [toDoList, setToDoList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment()._d);
  const { idsToDelete } = useListEditMenuValues();
  const generateId = () =>
    Math.random()
      .toString(36)
      .substr(2, 9);
  const createToDo = titleRef => {
    if (!titleRef.current || !titleRef.current.value) return;
    const data = {
      title: titleRef.current.value,
      _id: generateId(),
    };
    setToDoList(unshift(data));
    titleRef.current.value = '';
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
      url: `/me/toDo/create/${title}`,
      method: 'post',
      data: toDoList.map(toDo => ({
        title: toDo.title,
        createdAt: selectedDay,
      })),
    }).then(res => {
      const data = {
        _id: moment(selectedDay).format('YYYY-MM-DD'),
        toDoList: res.data,
      };
      setDetailProject(push(data));
      setToDoList([]);
    });
  };
  const handleDeleteMany = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm(`총 ${idsToDelete.length} 개를 삭제하시겠습니까?`))
      return;
    setToDoList(deleteMany(idsToDelete));
  };
  const mapToComponent = () =>
    toDoList.map(toDo => (
      <ToDo
        id={toDo._id}
        key={toDo._id}
        data={toDo}
        setToDoList={setToDoList}
        edit
      />
    ));
  return (
    <EditToDoList
      data={toDoList.length}
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
      createToDo={createToDo}
      createToDoList={createToDoList}
      handleDeleteMany={handleDeleteMany}
    >
      {mapToComponent()}
    </EditToDoList>
  );
};

export default withRouter(EditToDoContainer);
