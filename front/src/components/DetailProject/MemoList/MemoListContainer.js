import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { unshift } from 'lib/manuArrData';
import Memo from 'components/DetailProject/Memo';
import { useToDoListFns } from 'components/DetailProject/ToDoList/ToDoListContainer';
import MemoList from './MemoList';

const MemoContext = createContext();

export const useMemoListValues = () => {
  const { fns, ...values } = useContext(MemoContext);
  return values;
};

export const useMemoListFns = () => {
  const { fns } = useContext(MemoContext);
  return fns;
};

const MemoListConatiner = ({ id }) => {
  const { setToDoList } = useToDoListFns();
  const [memoList, setMemoList] = useState();
  useEffect(() => {
    if (!memoList) {
      axios({
        url: `/me/toDo/${id}?page=1`,
        method: 'get',
      }).then(res => {
        setMemoList(res.data);
      });
    }
  }, []);
  const createMemo = contentRef => {
    if (!contentRef.current) return;
    if (!contentRef.current.value) return;
    axios({
      url: `/me/memo/create/${id}`,
      method: 'post',
      data: { content: contentRef.current.value },
    })
      .then(res => {
        setMemoList(unshift(res.data));
        setToDoList(state =>
          state.map(data =>
            data._id !== id
              ? data
              : { ...data, memo: [...data.memo, res.data._id] },
          ),
        );
      })
      .finally(() => {
        if (contentRef.current) {
          contentRef.current.value = '';
        }
      });
  };
  const mapToComponent = () =>
    memoList.map(data => <Memo key={data._id} data={data} toDoId={id} />);
  return (
    <MemoContext.Provider value={{ memoList, fns: { setMemoList } }}>
      <MemoList createMemo={createMemo}>
        {memoList ? mapToComponent() : null}
      </MemoList>
    </MemoContext.Provider>
  );
};
export default MemoListConatiner;
