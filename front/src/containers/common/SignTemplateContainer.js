import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignTemplate from 'components/common/SignTemplate';
import * as signActions from 'store/modules/sign';
import * as userActions from 'store/modules/user';

const SignTemplateContainer = ({
  history,
  errorMessage,
  props,
  register,
  UserActions: { initErrorMessage, logIn, setErrorMessage },
  SignActions: { initProps, setProps },
}) => {
  const handleConfirm = () => {
    const { email, nick, password } = props;
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
      logIn({ email, nick, password });
    } else {
      logIn({ email, password });
    }
  };

  const handleChange = ({ type }) => e => {
    const {
      target: { value },
    } = e;
    setProps({ type, value });
  };

  const handleHistory = () => {
    initProps();
    initErrorMessage();
    if (register) history.push('/');
    else history.push('/register');
  };

  const getErrorMessage = () => {
    if (errorMessage === '') {
      if (register) return '회원가입';
      return '로그인';
    }
    return errorMessage;
  };

  return (
    <SignTemplate
      getErrorMessage={getErrorMessage}
      handleConfirm={handleConfirm}
      handleChange={handleChange}
      handleHistory={handleHistory}
      props={props}
      register={register}
    />
  );
};

SignTemplateContainer.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  props: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    nick: PropTypes.string.isRequired,
  }).isRequired,
  register: PropTypes.bool,
  SignActions: PropTypes.shape({
    initProps: PropTypes.func.isRequired,
    setProps: PropTypes.func.isRequired,
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
    props: state.sign.toJS(),
    errorMessage: state.user.get('error'),
  }),
  dispatch => ({
    // setErroressage: message => dispatch(userActions.setErrorMessage(message)),
    // logIn: data => dispatch(userActions.logIn(data)),
    UserActions: bindActionCreators(userActions, dispatch),
    SignActions: bindActionCreators(signActions, dispatch),
  }),
)(SignTemplateContainer);
