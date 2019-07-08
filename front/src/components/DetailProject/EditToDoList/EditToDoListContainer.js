import React, { useState, useRef } from 'react';
import moment from 'moment';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import axios from 'axios';
import { useOnlyPrivateValues } from 'store/Common/OnlyPrivate';
import { unshift, deleteMany } from 'lib/manuArrData';
import { useDataFns, TYPE } from 'store/Common/Data';
import ToDo from 'components/DetailProject/ToDo';
import EditToDoList from './EditToDoList';

const EditToDoContainer = () => {
  const [toDoList, setToDoList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment()._d);
  const { isEditMode, isMultiMode, idsToDelete } = useEditMenuValues();
  const { setEditMode, toggleMultiMode, initMode } = useEditMenuFns();
  const { selectedProjectId } = useOnlyPrivateValues();
  const { pushData } = useDataFns();
  const titleRef = useRef();
  const generateId = () =>
    Math.random()
      .toString(36)
      .substr(2, 9);
  const createToDo = () => {
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
      url: `/me/toDo/create/${selectedProjectId}`,
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
      console.log(data);
      pushData({ type: TYPE.DETAIL_PROJECT, data });
      setToDoList([]);
    });
  };
  const handleCreateToDoKeyUp = e => {
    if (e.keyCode === 13) {
      createToDo();
    }
  };
  const handleDeleteMany = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    setToDoList(deleteMany(idsToDelete));
  };
  return (
    <EditToDoList
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      setEditMode={setEditMode}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
      titleRef={titleRef}
      createToDo={createToDo}
      createToDoList={createToDoList}
      handleCreateToDoKeyUp={handleCreateToDoKeyUp}
      handleDeleteMany={handleDeleteMany}
    >
      {toDoList.map(toDo => (
        <ToDo
          id={toDo._id}
          key={toDo._id}
          data={toDo}
          setToDoList={setToDoList}
          edit
        />
      ))}
    </EditToDoList>
  );
};

export default EditToDoContainer;
