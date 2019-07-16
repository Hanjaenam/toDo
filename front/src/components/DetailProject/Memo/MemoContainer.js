import React, { useRef } from 'react';
import { useMouseEnterEdit } from 'lib/hooks';
import axios from 'axios';
import { useMemoListFns } from 'components/DetailProject/MemoList/MemoListContainer';
import { deleteOne, patch } from 'lib/manuArrData';
import { useToDoListFns } from 'components/DetailProject/ToDoList/ToDoListContainer';
import Memo from './Memo';

const MemoContainer = ({ data, toDoId }) => {
  const { setToDoList } = useToDoListFns();
  const { setMemoList } = useMemoListFns();
  const containerRef = useRef();
  const {
    isEditMode,
    contentChangeMode,
    setContentChangeMode,
  } = useMouseEnterEdit({ ref: containerRef });
  const deleteMemo = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    axios({ url: `/me/memo/delete/${data._id}`, method: 'delete' }).then(() => {
      setMemoList(deleteOne(data._id));
      setToDoList(state =>
        state.map(toDo =>
          toDo._id !== toDoId
            ? toDo
            : {
                ...toDo,
                memo: toDo.memo.filter(memoId => memoId !== data._id),
              },
        ),
      );
    });
  };
  const patchMemo = contentRef => {
    if (data.content === contentRef.current.value) return;
    axios({
      url: `/me/memo/patch/${data._id}`,
      method: 'patch',
      data: {
        content: contentRef.current.value,
      },
    }).then(res => {
      setMemoList(patch(data._id, res.data));
      setContentChangeMode(false);
    });
  };
  return (
    <Memo
      data={data}
      deleteMemo={deleteMemo}
      patchMemo={patchMemo}
      containerRef={containerRef}
      isEditMode={isEditMode}
      contentChangeMode={contentChangeMode}
      setContentChangeMode={setContentChangeMode}
    />
  );
};
export default MemoContainer;
