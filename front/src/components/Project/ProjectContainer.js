import React, { useState, useEffect } from 'react';
import { useFns } from 'store/Project/Project';
import AddToDo from 'components/Project/AddToDo';
import axios from 'axios';
import Project from './Project';

const ToDoListContainer = () => {
  const [loading, setLoading] = useState(true);
  const { loadData, mapToComponent } = useFns();
  useEffect(() => {
    setLoading(true);
    axios({
      url: '/toDo/readAll',
      method: 'get',
    })
      .then(res => loadData(res.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? null : (
    <Project>
      {mapToComponent()}
      <AddToDo />
    </Project>
  );
};
export default ToDoListContainer;
