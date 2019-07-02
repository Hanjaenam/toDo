import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { LogIn, Register, ProjectList, Project } from 'pages';
import GlobalStyles from 'styles/global';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/project" component={ProjectList} /> */}
          <Route exact path="/project" component={Project} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
