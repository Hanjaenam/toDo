import React, { useEffect } from 'react';
import { useStatus } from 'lib/hooks';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import LogInTemplate from 'components/Common/LogInTemplate';
import axios from 'axios';
import { useFns } from 'store/User';

const LogIn = ({ history }) => {
  const { logIn, setError } = useFns();
  const {
    loading,
    fns: { end },
  } = useStatus();
  useEffect(() => {
    axios({
      url: '/user/getInfo',
      method: 'get',
    }).then(res => {
      if (res.status === 200) {
        logIn(res.data);
        history.replace('/project');
      } else if (res.status === 204) {
        end();
      }
    });
  }, []);
  const handleFetch = ({ eValue, pValue }) => {
    axios({
      url: '/user/logIn',
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
      {loading ? null : (
        <LogInTemplate type="logIn" handleFetch={handleFetch} />
      )}
    </>
  );
};
LogIn.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
export default LogIn;
