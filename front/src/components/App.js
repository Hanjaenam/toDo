import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LogInPage, RegisterPage, ProjectListPage } from 'pages';
import { connect } from 'react-redux';
import { getInfo } from 'store/modules/user';

const App = ({ loading, getUserInfo }) => {
  useEffect(() => {
    getUserInfo();
  }, []);
  return loading === false ? (
    <Switch>
      <Route exact path="/" component={LogInPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/me/project" component={ProjectListPage} />
    </Switch>
  ) : null;
};

export default connect(
  state => ({
    loading: state.pender.pending['user/GET_INFO'],
  }),
  dispatch => ({ getUserInfo: () => dispatch(getInfo()) }),
)(App);
