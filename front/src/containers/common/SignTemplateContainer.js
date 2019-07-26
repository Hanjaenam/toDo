import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignTemplate from 'components/Common/SignTemplate';
import * as signActions from 'store/modules/sign';
import * as userActions from 'store/modules/user';
import LANG, { htmlLang } from 'lib/htmlLanguage';
import CONFIG from 'lib/config';

const SignTemplateContainer = ({
  history,
  errorMessage,
  userData,
  register,
  SignActions: { initUserData, setUserData },
  UserActions: { initErrorMessage, logIn, setErrorMessage },
}) => {
  const handleConfirm = () => {
    const { email, nick, password } = userData;
    if (email === '') {
      setErrorMessage('이메일 입력해주세요');
      return;
    }
    if (password === '') {
      setErrorMessage('비밀번호를 입력해주세요');
      return;
    }
    if (register && nick === '') {
      setErrorMessage('닉네임을 입력해주세요');
      return;
    }

    if (register) {
      logIn({ email, nick, password }).then(() =>
        history.replace(CONFIG.ME_PROJECT_HOME),
      );
    } else {
      logIn({ email, password }).then(() =>
        history.replace(CONFIG.ME_PROJECT_HOME),
      );
    }
  };

  const handleChange = ({ type }) => e => {
    const {
      target: { value },
    } = e;
    setUserData({ type, value });
  };

  const handleHistory = () => {
    initUserData();
    initErrorMessage();
    if (register) history.push('/');
    else history.push('/register');
  };

  const getErrorMessage = () => {
    if (errorMessage === '') {
      if (register) return LANG.REGISTER[htmlLang];
      return LANG.SIGN_IN[htmlLang];
    }
    return errorMessage;
  };

  return (
    <SignTemplate
      getErrorMessage={getErrorMessage}
      handleConfirm={handleConfirm}
      handleChange={handleChange}
      handleHistory={handleHistory}
      userData={userData}
      register={register}
    />
  );
};

SignTemplateContainer.propTypes = {
  history: PropTypes.shape({}).isRequired,
  errorMessage: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    nick: PropTypes.string.isRequired,
  }).isRequired,
  register: PropTypes.bool,
  SignActions: PropTypes.shape({
    initUserData: PropTypes.func.isRequired,
    setUserData: PropTypes.func.isRequired,
  }).isRequired,
  UserActions: PropTypes.shape({
    logIn: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
  }).isRequired,
};

SignTemplateContainer.defaultProps = {
  register: false,
};

export default connect(
  state => ({
    userData: state.sign.toJS(),
    errorMessage: state.user.get('error'),
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    SignActions: bindActionCreators(signActions, dispatch),
  }),
)(SignTemplateContainer);
