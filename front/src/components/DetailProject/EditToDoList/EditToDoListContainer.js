import React, { useState, useRef } from 'react';
import moment from 'moment';
import {
  useDetailProjectFns,
  useDetailProjectValues,
} from 'store/DetailProject';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import axios from 'axios';
import { push } from 'lib/manuArrData';
import ToDo from 'components/DetailProject/ToDo';
import EditToDoList from './EditToDoList';

const EditToDoContainer = () => {
  const [toDos, setToDos] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment()._d);
  const titleRef = useRef();
  const { projectId } = useDetailProjectValues();
  const { pushToDoList } = useDetailProjectFns();
  const { isEditMode, isMultiMode } = useEditMenuValues();
  const { setEditMode, toggleMultiMode, initMode } = useEditMenuFns();
  const createToDoListWithToDo = () => {
    if (toDos.length === 0) return;
    if (
      !window.confirm(
        `${moment(selectedDay).format(
          'YYYY-MM-DD',
        )} 이 날짜로 할 일을 추가하시겠습니까?`,
      )
    )
      return;
    axios({
      url: `/me/toDoList/create/${projectId}`,
      method: 'post',
      data: toDos.map(toDo => ({ ...toDo, createdAt: selectedDay })),
    }).then(res => {
      console.log(res);
      // const { toDoList, toDo } = res.data;
      // unshiftToDoData(toDo);
    });
  };
  const createToDo = () => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    const data = { title: titleRef.current.value };
    setToDos(push(data));
    titleRef.current.value = '';
  };
  const handleCreateToDoKeyUp = e => {
    if (e.keyCode === 13) {
      createToDo();
    }
  };
  return (
    <EditToDoList
      setSelectedDay={setSelectedDay}
      selectedDay={selectedDay}
      titleRef={titleRef}
      createToDoListWithToDo={createToDoListWithToDo}
      createToDo={createToDo}
      handleCreateToDoKeyUp={handleCreateToDoKeyUp}
      isEditMode={isEditMode}
      setEditMode={setEditMode}
      isMultiMode={isMultiMode}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
    >
      {toDos.map(data => (
        <ToDo data={data} key={data.title} />
      ))}
    </EditToDoList>
  );
};

export default EditToDoContainer;
