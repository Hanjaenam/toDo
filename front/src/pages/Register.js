import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import LogInTemplate from 'components/Common/LogInTemplate';
import axios from 'axios';
import { useFns } from 'store/User';
import { useStatus } from 'lib/hooks';
import OnlyPublic from 'components/OnlyPublic';

const Register = ({ history }) => {
  const { logIn, setError } = useFns();
  const {
    loading,
    fns: { end },
  } = useStatus();
  useEffect(() => {
    axios({
      url: '/me',
      method: 'get',
    })
      .then(res => {
        logIn(res.data);
        history.replace('/me/project');
      })
      .catch(() => end());
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
        history.replace('/me/project');
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
      {loading ? null : (
        <LogInTemplate type="register" handleFetch={handleFetch} />
      )}
    </>
  );
};
Register.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
export default ({ history }) => (
  <OnlyPublic history={history}>
    <Register history={history} />
  </OnlyPublic>
);
