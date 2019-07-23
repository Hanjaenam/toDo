import { useState, useEffect } from 'react';
import CONFIG from 'config';
import moment from 'moment';

export const useStatus = () => {
  const [status, setStatus] = useState({
    loading: true,
    error: null,
  });
  const failure = error => setStatus(s => ({ ...s, error }));
  const end = () => setStatus(s => ({ ...s, loading: false }));
  return {
    loading: status.loading,
    error: status.error,
    fns: { failure, end },
  };
};

export const useTextChangeMode = ({ isEditMode, isMultiMode }) => {
  const [textChangeMode, setTextChangeMode] = useState(false);
  useEffect(() => {
    if ((!isEditMode && textChangeMode) || isMultiMode) {
      setTextChangeMode(false);
    }
  }, [isEditMode, isMultiMode]);
  return { textChangeMode, setTextChangeMode };
};

export const useToDoMemo = ({ isEditMode }) => {
  const [showToDoMemo, setShowToDoMemo] = useState(false);
  useEffect(() => {
    if (isEditMode) {
      setShowToDoMemo(false);
    }
  }, [isEditMode]);
  return { showToDoMemo, setShowToDoMemo };
};

export const useMouseEnterEdit = ({ ref }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [contentChangeMode, setContentChangeMode] = useState(false);
  const handleMouseEnter = () => {
    setEditMode(true);
  };
  const handleMouseLeave = () => {
    setEditMode(false);
  };
  const addEvent = () => {
    ref.current.addEventListener('mouseenter', handleMouseEnter);
    ref.current.addEventListener('mouseleave', handleMouseLeave);
  };
  const removeEvent = () => {
    ref.current.removeEventListener('mouseenter', handleMouseEnter);
    ref.current.removeEventListener('mouseleave', handleMouseLeave);
  };
  useEffect(() => {
    if (!ref.current)
      throw new Error('useMouseEnterEdit / useEffect / !ref.current');
    addEvent();
    return () => removeEvent();
  });
  return { isEditMode, setContentChangeMode, contentChangeMode };
};

export const useOnlyPublic = ({ user, history }) => {
  const [startRender, setStartRender] = useState(false);
  useEffect(() => {
    if (user) history.replace(`/me/project?${CONFIG.HOME_INIT_QUERY}`);
    else setStartRender(true);
  }, [user]);
  return startRender;
};

export const useOnlyPrivate = ({ user, history }) => {
  const [userExisted, setUser] = useState(false);
  useEffect(() => {
    if (!user) history.replace('/');
    else setUser(true);
  }, [user]);
  return userExisted;
};

export const usePage = () => {
  const [page, _setPage] = useState({
    current: 1,
    total: 1,
    limit: undefined,
    mount: false,
  });
  const setPage = current => _setPage(s => ({ ...s, current }));
  const init = ({ total, limit }) => {
    if (!page.mount) {
      _setPage(s => ({ ...s, mount: true, total, limit }));
    }
  };
  return { page, setPage, init };
};

export const useSelectedDay = ({ toDoListByDate }) => {
  const [selectedDay, setSelectedDay] = useState();
  const isExistedDate = () =>
    toDoListByDate
      .filter(
        ({ _id }) =>
          Number(moment().format('YYYYMMDD')) <= Number(_id.replace(/-/g, '')),
      )
      .sort((a, b) => (a._id > b._id ? 1 : -1))
      .filter(
        ({ _id }, idx) =>
          moment()
            .add(idx, 'days')
            .format('YYYY-MM-DD') === _id,
      )
      .map(data => moment(data._id)._d);
  const initDay = () => {
    const arr = isExistedDate();
    if (arr.length === 0) {
      return setSelectedDay(moment()._d);
    }
    return setSelectedDay(moment(arr[arr.length - 1]).add(1, 'days')._d);
  };
  useEffect(() => {
    initDay();
  }, [toDoListByDate]);
  return { selectedDay, setSelectedDay, isExistedDate };
};

export const usePatchData = ({ title, isPublic, importance, ...rest }) => {
  const [patchData, setPatchData] = useState({
    title,
    isPublic,
    importance,
    ...rest,
  });
  return { patchData, setPatchData };
};
