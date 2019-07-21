import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import LogInTemplate from 'components/Common/LogInTemplate';
import axios from 'axios';
import { useFns, useUser } from 'store/User';
import { useStatus, useOnlyPublic } from 'lib/hooks';
import CONFIG from 'config';

const Register = ({ history }) => {
  const user = useUser();
  useOnlyPublic({ user, history });
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
        history.replace(CONFIG.HOME_URL);
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
        history.replace(CONFIG.HOME_URL);
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

export default Register;
