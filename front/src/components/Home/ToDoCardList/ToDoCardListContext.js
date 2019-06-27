import React, { createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment';
import ToDoCard from 'components/Home/ToDoCard';

export const ToDoCardListContext = createContext();
const ToDoCardListProvider = ({ children }) => {
  const [dataList, setData] = useState();
  const addToDo = async () => {
    const title = document.getElementById('addTitle');
    try {
      await setData(s => [
        <ToDoCard
          title={title.value}
          date={moment().format('YYYY[.]MM[.]DD')}
        />,
        ...s,
      ]);
    } catch (e) {
      throw e;
    } finally {
      title.value = '';
    }
  };
  const handleEnter = event => {
    if (event.keyCode === 13) {
      addToDo();
    }
  };
  useEffect(() => {}, []);
  return (
    <ToDoCardListContext.Provider
      value={{
        dataList: [
          <ToDoCard key="1" add addToDo={addToDo} handleEnter={handleEnter} />,
          dataList,
        ],
        fns: { addToDo },
      }}
    >
      {children}
    </ToDoCardListContext.Provider>
  );
};

export const useToDoList = () => {
  const { dataList } = useContext(ToDoCardListContext);
  return dataList;
};

export const useToDoListFns = () => {
  const { fns } = useContext(ToDoCardListContext);
  return fns;
};

export default ToDoCardListProvider;
