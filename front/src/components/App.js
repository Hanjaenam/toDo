import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { LogIn, Register, ProjectList, DetailProject } from 'pages';
import GlobalStyles from 'styles/global';
import OnlyPrivate from 'store/Common/OnlyPrivate';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/me/project" component={ProjectList} />
          <Route exact path="/me/project/:id" component={DetailProject} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
