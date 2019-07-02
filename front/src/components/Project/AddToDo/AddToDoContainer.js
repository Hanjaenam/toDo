import React, { useState, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useFns } from 'store/Project/Project';
import ToDo from './AddToDo';

const ToDoContainer = ({ id }) => {
  const [selectedDay, setSelectedDay] = useState(moment().add(1, 'day')._d);
  const titleRef = useRef();
  const { addData } = useFns();
  const handleDayChange = day => {
    setSelectedDay(day);
  };
  const handleAddToDo = () => {
    if (!titleRef.current) return;
    if (!titleRef.current.value) return;
    axios({
      url: '/toDo/add',
      method: 'post',
      title: titleRef.current.value,
    }).then(res => addData(res.data));
  };
  const handleAddClick = () => {
    handleAddToDo();
  };
  const handleAddKeyUp = e => {
    if (e.keyCode === 13) {
      handleAddToDo();
    }
  };
  return (
    <ToDo
      handleDayChange={handleDayChange}
      selectedDay={selectedDay}
      titleRef={titleRef}
      handleAddClick={handleAddClick}
      handleAddKeyUp={handleAddKeyUp}
    />
  );
};

export default ToDoContainer;
