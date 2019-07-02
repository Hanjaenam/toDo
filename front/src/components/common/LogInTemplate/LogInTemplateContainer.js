import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFns, useError } from 'store/User';
import axios from 'axios';
import LogInTemplate from './LogInTemplate';

const LogInTemplateContainer = ({ type, handleFetch, history }) => {
  const [existUser, setUser] = useState();
  const error = useError();
  const { logIn, setError } = useFns();
  useEffect(() => {
    axios({
      url: '/auth/getUser',
      method: 'get',
    }).then(res => {
      if (res.status === 200) {
        logIn(res.data);
        history.replace('/project');
      } else if (res.status === 204) {
        setUser(false);
      }
    });
  }, []);
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const isValid = ({ eValue, pValue, cpValue }) => {
    if (!eValue) {
      setError('이메일을 입력해주세요.');
      return false;
    }
    if (!pValue) {
      setError('비밀번호를 입력해주세요.');
      return false;
    }
    if (type === 'register' && !cpValue) {
      setError('확인 비밀번호까지 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    const eValue = email.current.value;
    const pValue = password.current.value;
    const cpValue = type === 'register' ? confirmPassword.current.value : null;
    if (!isValid({ eValue, pValue, cpValue })) return;
    if (type === 'register') {
      handleFetch({ eValue, pValue, cpValue });
    } else {
      handleFetch({ eValue, pValue });
    }
  };
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleConfirm();
    }
  };
  return existUser === false ? (
    <LogInTemplate
      type={type}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      handleConfirm={handleConfirm}
      handleKeyUp={handleKeyUp}
      error={error}
    />
  ) : null;
};

LogInTemplateContainer.propTypes = {
  type: PropTypes.string.isRequired,
  handleFetch: PropTypes.func.isRequired,
};
export default LogInTemplateContainer;
