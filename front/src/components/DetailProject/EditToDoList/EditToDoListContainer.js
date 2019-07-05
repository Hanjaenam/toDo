import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import ToDoListProvider, {
  useToDoListFns,
  useToDoListDatas,
} from 'store/DetailProject/ToDoList';
import { useEditMenuValues, useEditMenuFns } from 'store/Common/EditMenu';
import EditToDoList from './EditToDoList';

const EditToDoContainer = () => {
  const [selectedDay, setSelectedDay] = useState(moment()._d);
  const titleRef = useRef();
  const { mapToComponent, unshiftData, initData } = useToDoListFns();
  const toDoListDatas = useToDoListDatas();
  const { isEditMode, isMultiMode } = useEditMenuValues();
  const { setEditMode, toggleMultiMode, initMode } = useEditMenuFns();
  useEffect(initData, []);
  const handleDayChange = day => {
    setSelectedDay(day);
  };
  const AddToDo = () => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    const data = { title: titleRef.current.value };
    unshiftData(data);
    titleRef.current.value = '';
  };
  const handleAddClick = () => {
    AddToDo();
  };
  const handleAddKeyUp = e => {
    if (e.keyCode === 13) {
      AddToDo();
    }
  };
  return (
    <EditToDoList
      handleDayChange={handleDayChange}
      selectedDay={selectedDay}
      titleRef={titleRef}
      handleAddClick={handleAddClick}
      handleAddKeyUp={handleAddKeyUp}
      isEditMode={isEditMode}
      setEditMode={setEditMode}
      isMultiMode={isMultiMode}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
    >
      {toDoListDatas ? mapToComponent() : null}
    </EditToDoList>
  );
};

export default () => (
  <ToDoListProvider>
    <EditToDoContainer />
  </ToDoListProvider>
);
