import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { LogIn, Register, ProjectList, DetailProject } from 'pages';
import ProjectProvider from 'store/Project';
import GlobalStyles from 'styles/global';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <ProjectProvider>
            {/* <Route exact path="/project" component={ProjectList} /> */}
            <Route exact path="/project" component={DetailProject} />
          </ProjectProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
