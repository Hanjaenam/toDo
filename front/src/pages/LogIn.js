import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import LogInTemplate from 'components/common/LogInTemplate';
import axios from 'axios';
import { useFns } from 'store/User';

const LogIn = ({ history }) => {
  console.log('todo');
  const { logIn, setError } = useFns();
  useEffect(() => {
    setError();
  }, []);
  const handleFetch = ({ eValue, pValue }) => {
    axios({
      url: '/auth/logIn',
      method: 'post',
      data: {
        email: eValue,
        password: pValue,
      },
    })
      .then(res => {
        logIn(res.data);
        history.replace('/project');
      })
      .catch(err => {
        setError(err.response.data.message[0]);
      });
  };
  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <LogInTemplate type="logIn" handleFetch={handleFetch} history={history} />
    </>
  );
};
export default LogIn;
