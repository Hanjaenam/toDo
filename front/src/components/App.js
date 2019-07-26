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

const App = ({ getUserLoading, getUserInfo }) => {
  useEffect(() => {
    // 처음 웹사이트 킬 때 서버에서 유저정보를 가져온다
    // 세션이 있을 경우 유지될수 있도록 해준 것.
    getUserInfo();
  }, []);

  return getUserLoading === false ? (
    <Switch>
      <Route exact path="/" component={SignInPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/me/project" component={ProjectListPage} />
      <Route exact path="/me/project/new" component={NewProjectPage} />
      <Route exact path="/me/project/:title" component={DetailProjectPage} />
      <Route render={() => <div>404 NOT FOUND</div>} />
    </Switch>
  ) : null;
};

App.propTypes = {
  getUserLoading: PropTypes.bool,
  getUserInfo: PropTypes.func.isRequired,
};

App.defaultProps = {
  getUserLoading: undefined,
};

export default connect(
  state => ({
    getUserLoading: state.pender.pending['user/GET_INFO'],
  }),
  dispatch => ({ getUserInfo: () => dispatch(getInfo()) }),
)(withRouter(App));
