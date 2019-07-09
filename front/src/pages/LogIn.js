import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import LogInTemplate from 'components/Common/LogInTemplate';
import axios from 'axios';
import { useFns } from 'store/User';
import OnlyPublic from 'components/Common/OnlyPublic';

const LogIn = ({ history }) => {
  const { logIn, setError } = useFns();
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
        history.replace('/me/project');
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
      <LogInTemplate type="logIn" handleFetch={handleFetch} />
    </>
  );
};
LogIn.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
export default ({ history }) => (
  <OnlyPublic history={history}>
    <LogIn history={history} />
  </OnlyPublic>
);
