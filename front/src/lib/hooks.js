import { useState, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
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
