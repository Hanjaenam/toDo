import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  useDetailProjectFns,
  useDetailProjectValues,
} from 'pages/DetailProject';
import { unshift, deleteMany, deleteOne } from 'lib/manuArrData';
import ToDo from 'components/DetailProject/ToDo';
import moment from 'moment';
import { useListEditMenuValues } from 'store/Common/ListEditMenu';
import EditMenuProvider from 'store/Common/EditMenu';
import ToDoList from './ToDoList';

const ToDoListContainer = ({
  createdAt,
  data = [],
  // match: {
  //   params: { id },
  // },
  id,
  edit,
}) => {
  const [toDoList, setToDoList] = useState(data);
  const { setDetailProject } = useDetailProjectFns();
  const { detailProject } = useDetailProjectValues();
  const { idsToDelete } = useListEditMenuValues();
  const isExistedTodayData = () =>
    detailProject.findIndex(
      data => data._id === moment(Date.now()).format('YYYY-MM-DD'),
    ) !== -1;
  const getTommorrowDay = () => {
    const date = new Date();
    return date.setDate(date.getDate() + 1);
  };
  const [selectedDay, setSelectedDay] = useState(
    isExistedTodayData() ? moment(getTommorrowDay())._d : moment()._d,
  );
  const generateId = () =>
    Math.random()
      .toString(36)
      .substr(2, 9);
  const isPreviousToDo = () => {
    if (edit) return;
    const now = Number(moment(Date.now()).format('YYYYMMDD'));
    return now === Number(createdAt.replace(/-/g, ''))
      ? false
      : now >= Number(createdAt.replace(/-/g, ''));
  };

  const createToDo = titleRef => {
    if (!titleRef.current || !titleRef.current.value) return;
    const data = {
      title: titleRef.current.value,
    };
    if (edit) {
      data._id = generateId();
      setToDoList(unshift(data));
      titleRef.current.value = '';
    } else {
      data.createdAt = createdAt;
      axios({ url: `/me/toDo/create/${id}`, method: 'post', data })
        .then(res => {
          setToDoList(unshift(res.data));
        })
        .finally(() => {
          titleRef.current.value = '';
        });
    }
  };
  const deleteManyToDo = () => {
    if (idsToDelete.length === 0) return;
    if (!window.confirm(`총 ${idsToDelete.length} 개를 삭제하시겠습니까?`))
      return;
    if (edit) setToDoList(deleteMany(idsToDelete));
    else {
      axios({
        url: '/me/toDo/delete',
        data: idsToDelete,
        method: 'delete',
      }).then(() => setToDoList(deleteMany(idsToDelete)));
    }
  };
  const createToDoList = () => {
    if (!edit) return;
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
      url: `/me/toDo/create/${id}`,
      method: 'post',
      data: toDoList.map(toDo => ({
        title: toDo.title,
        createdAt: selectedDay,
      })),
    })
      .then(res => {
        const data = {
          _id: moment(selectedDay).format('YYYY-MM-DD'),
          toDoList: res.data,
        };
        setDetailProject(unshift(data));
      })
      .finally(() => {
        setToDoList([]);
      });
  };
  const deleteToDoList = () => {
    if (edit) return;
    if (!window.confirm(`${createdAt} 삭제하시겠습니까?`)) return;
    axios({
      url: `/me/toDo/delete`,
      method: 'delete',
      data: data.map(_data => _data._id),
    }).then(() => {
      setDetailProject(deleteOne(createdAt));
    });
  };
  const mapToComponent = () =>
    toDoList.map(toDo => (
      <EditMenuProvider key={toDo._id}>
        <ToDo id={toDo._id} data={toDo} setToDoList={setToDoList} edit={edit} />
      </EditMenuProvider>
    ));
  return (
    <ToDoList
      createdAt={createdAt}
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
      isPreviousToDo={isPreviousToDo}
      createToDo={createToDo}
      deleteManyToDo={deleteManyToDo}
      createToDoList={createToDoList}
      deleteToDoList={deleteToDoList}
      edit={edit || false}
      isExistedTodayData={isExistedTodayData()}
    >
      {mapToComponent()}
    </ToDoList>
  );
};
ToDoListContainer.propTypes = {
  createdAt: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  edit: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
ToDoListContainer.defaultProps = {
  data: undefined,
  createdAt: undefined,
  edit: undefined,
};

export default withRouter(ToDoListContainer);
