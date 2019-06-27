import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useFns } from 'store/User';
import { useAxios } from 'lib/hooks';
import LogInTemplate from './LogInTemplate';

const LogInTemplateContainer = ({ type }) => {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const fn = useFns();
  const { state, fetch, setState } = useAxios(fn.logIn);
  const handleFetch = () => {
    const eValue = email.current.value;
    const pValue = password.current.value;
    if (!eValue) {
      setState(s => ({ ...s, failure: '이메일을 입력해주세요.' }));
      return;
    }
    if (!pValue) {
      setState(s => ({ ...s, failure: '비밀번호를 입력해주세요.' }));
      return;
    }
    if (type === 'register' && !confirmPassword.current.value) {
      setState(s => ({ ...s, failure: '확인 비밀번호까지 입력해주세요.' }));
      return;
    }
    fetch({
      url: type === 'register' ? '/auth/register' : '/auth/logIn',
      method: 'post',
      data: {
        email: email.current.value,
        password: password.current.value,
        confirmPassword:
          type === 'register' ? confirmPassword.current.value : '',
      },
    });
  };
  const handleKeyUp =
    type === 'register'
      ? null
      : e => {
          if (e.keyCode === 13) {
            handleFetch();
          }
        };
  return (
    <LogInTemplate
      type={type}
      message={state.failure || (type === 'register' ? '회원가입' : '로그인')}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      fetch={handleFetch}
      handleKeyUp={handleKeyUp}
      failure={state.failure}
    />
  );
};

LogInTemplateContainer.propTypes = {
  type: PropTypes.string.isRequired,
};
export default LogInTemplateContainer;
