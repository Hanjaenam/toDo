import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
// import ToDoListProvider, {
//   useToDoFns,
//   useToDoDatas,
// } from 'store/DetailProject/ToDoList';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import axios from 'axios';
import { useProjectValues } from 'store/Project';
import EditToDoList from './EditToDoList';

const EditToDoContainer = () => {
  const [selectedDay, setSelectedDay] = useState(moment()._d);
  const { selectedProjectId } = useProjectValues();
  const titleRef = useRef();
  // const {
  //   mapToComponent,
  //   unshiftData: unshiftToDoData,
  //   initData,
  // } = useToDoFns();
  // const toDoDatas = useToDoDatas();
  const { isEditMode, isMultiMode } = useEditMenuValues();
  const { setEditMode, toggleMultiMode, initMode } = useEditMenuFns();
  // useEffect(initData, []);
  // const createToDoListWithToDo = () => {
  //   if (toDoDatas.length === 0) return;
  //   if (
  //     !window.confirm(
  //       `${moment(selectedDay).format(
  //         'YYYY-MM-DD',
  //       )} 이 날짜로 할 일을 추가하시겠습니까?`,
  //     )
  //   )
  //     return;
  //   axios({
  //     url: `/toDoList/createWithToDo/${selectedProjectId}`,
  //     method: 'post',
  //     data: {
  //       toDoDatas,
  //     },
  //   }).then(res => {
  //     const { toDoList, toDo } = res.data;
  //     unshiftToDoData(toDo);
  //   });
  // };
  const createToDo = () => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    const data = { title: titleRef.current.value };
    // unshiftToDoData(data);
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
      // createToDoListWithToDo={createToDoListWithToDo}
      createToDo={createToDo}
      handleCreateToDoKeyUp={handleCreateToDoKeyUp}
      isEditMode={isEditMode}
      setEditMode={setEditMode}
      isMultiMode={isMultiMode}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
    >
      {/* {toDoDatas ? mapToComponent() : null} */}
    </EditToDoList>
  );
};

export default EditToDoContainer;
