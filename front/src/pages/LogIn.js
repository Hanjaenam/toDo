import React from 'react';
import Helmet from 'react-helmet';
import LogInTemplate from 'components/common/LogInTemplate';

const LogIn = () => {
  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <LogInTemplate type="logIn" />
    </>
  );
};
export default LogIn;
