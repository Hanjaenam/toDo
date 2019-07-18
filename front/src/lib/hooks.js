import { useState, useEffect } from 'react';

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

export const useChangeTitleMode = ({ isEditMode, isMultiMode }) => {
  const [titleChangeMode, setTitleChangeMode] = useState(false);
  useEffect(() => {
    if ((!isEditMode && titleChangeMode) || isMultiMode) {
      setTitleChangeMode(false);
    }
  }, [isEditMode, isMultiMode]);
  return { titleChangeMode, setTitleChangeMode };
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
    if (user) history.replace('/me/project');
    else setStartRender(true);
  }, [user]);
  return startRender;
};
export const useOnlyPrivate = ({ user, history }) => {
  const [startRender, setStartRender] = useState(false);
  useEffect(() => {
    if (!user) history.replace('/');
    else setStartRender(true);
  }, [user]);
  return startRender;
};

export const usePage = () => {
  const SORT = {
    LATEST: 'latest',
    IMPORTANCE: 'importance',
  };
  const [sort, setSort] = useState(SORT.LATEST);
  const [page, setPage] = useState({
    current: 1,
    total: 1,
    dataLimit: undefined,
  });
  return { SORT, sort, setSort, page, setPage };
};
