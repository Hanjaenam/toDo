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
  useEffect(() => {
    if (!ref.current)
      throw new Error('useMouseEnterEdit / useEffect / !ref.current');
    ref.current.addEventListener('mouseenter', handleMouseEnter);
    ref.current.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      ref.current.removeEventListener('mouseenter', handleMouseEnter);
      ref.current.removeEventListener('mouseleave', handleMouseLeave);
    };
  });
  return { isEditMode, setContentChangeMode, contentChangeMode };
};
