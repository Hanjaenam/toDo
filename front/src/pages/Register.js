import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import LogInTemplate from 'components/common/LogInTemplate';
import axios from 'axios';
import { useFns } from 'store/User';

const Register = ({ history }) => {
  console.log('register');
  const { logIn, setError } = useFns();
  useEffect(() => {
    setError();
  }, []);
  const handleFetch = ({ eValue, pValue, cpValue }) => {
    axios({
      url: '/auth/register',
      method: 'post',
      data: {
        email: eValue,
        password: pValue,
        confirmPassword: cpValue,
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
        <title>회원가입</title>
      </Helmet>
      <LogInTemplate
        type="register"
        handleFetch={handleFetch}
        history={history}
      />
    </>
  );
};
export default Register;
