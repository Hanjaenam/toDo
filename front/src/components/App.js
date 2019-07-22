import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {
  LogIn,
  Register,
  ProjectList,
  DetailProject,
  CreateProject,
} from 'pages';
import GlobalStyles from 'styles/global';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/me/project" component={ProjectList} />
          <Route exact path="/me/project/create" component={CreateProject} />
          <Route exact path="/me/project/:id" component={DetailProject} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
