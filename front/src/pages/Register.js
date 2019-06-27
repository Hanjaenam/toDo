import React from 'react';
import Helmet from 'react-helmet';
import LogInTemplate from 'components/common/LogInTemplate';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <LogInTemplate type="register" />
    </>
  );
};
export default Register;
