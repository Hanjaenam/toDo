import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  SignInPage,
  RegisterPage,
  ProjectListPage,
  NewProjectPage,
  DetailProjectPage,
} from 'pages';
import { connect } from 'react-redux';
import { getInfo } from 'store/modules/user';
import CONFIG from 'lib/config';

const App = ({ getUserLoading, getUserInfo, history, signIn }) => {
  useEffect(() => {
    // 처음 웹사이트 킬 때 서버에서 유저정보를 가져온다
    // 세션이 있을 경우 유지될수 있도록 해준 것.
    getUserInfo();
  }, []);
  useEffect(() => {
    // 로그인 혹은 로그아웃 할 경우 페이지 변경을 위해
    if (signIn) {
      history.replace(CONFIG.ME_PROJECT_HOME);
    } else {
      history.replace('/');
    }
  }, [signIn]);

  return getUserLoading === false ? (
    <Switch>
      <Route exact path="/" component={SignInPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/me/project" component={ProjectListPage} />
      <Route exact path="/me/project/new" component={NewProjectPage} />
      <Route exact path="/me/project/:title" component={DetailProjectPage} />
    </Switch>
  ) : null;
};

App.propTypes = {
  getUserLoading: PropTypes.bool,
  getUserInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  signIn: PropTypes.bool.isRequired,
};

App.defaultProps = {
  getUserLoading: undefined,
};

export default connect(
  state => ({
    signIn: state.user.get('signIn'),
    getUserLoading: state.pender.pending['user/GET_INFO'],
  }),
  dispatch => ({ getUserInfo: () => dispatch(getInfo()) }),
)(withRouter(App));
