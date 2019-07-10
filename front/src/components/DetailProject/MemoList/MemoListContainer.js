import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { unshift } from 'lib/manuArrData';
import Memo from 'components/DetailProject/Memo';
import {
  useListEditMenuValues,
  useListEditMenuFns,
} from 'store/Common/ListEditMenu';
import MemoList from './MemoList';

const MemoListConatiner = ({ id }) => {
  const [memo, setMemo] = useState();
  const { isEditMode, isMultiMode } = useListEditMenuValues();
  const { setEditMode, toggleMultiMode } = useListEditMenuFns();
  useEffect(() => {
    if (!memo) {
      axios({
        url: `/me/memo/${id}?page=1`,
        method: 'get',
      }).then(res => {
        setMemo(res.data);
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
        setMemo(unshift(res.data));
      })
      .finally(() => {
        contentRef.current.value = '';
      });
  };
  const mapToComponent = () =>
    memo.map(data => <Memo key={data._id} data={data} />);
  return (
    <MemoList
      // isEditMode={isEditMode}
      // isMultiMode={isMultiMode}
      // setEditMode={setEditMode}
      // toggleMultiMode={toggleMultiMode}
      createMemo={createMemo}
    >
      {memo ? mapToComponent() : null}
    </MemoList>
  );
};
export default MemoListConatiner;
