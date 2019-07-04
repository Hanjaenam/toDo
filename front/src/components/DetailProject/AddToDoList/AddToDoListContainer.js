import React, { useState, useRef } from 'react';
import moment from 'moment';
import { useAddToDoListFns } from 'store/DetailProject/AddToDoList';
import AddToDoList from './AddToDoList';

const AddToDoContainer = () => {
  const [selectedDay, setSelectedDay] = useState(moment()._d);
  const titleRef = useRef();
  const { mapToComponent, unshiftData } = useAddToDoListFns();
  const handleDayChange = day => {
    setSelectedDay(day);
  };
  const AddToDo = () => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    unshiftData({ title: titleRef.current.value });
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
    <AddToDoList
      handleDayChange={handleDayChange}
      selectedDay={selectedDay}
      titleRef={titleRef}
      handleAddClick={handleAddClick}
      handleAddKeyUp={handleAddKeyUp}
    >
      {mapToComponent()}
    </AddToDoList>
  );
};

export default AddToDoContainer;
