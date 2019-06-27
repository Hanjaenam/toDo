import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'components/common/Header';
import { LogIn, Register, Home, ToDo } from 'pages';
import UserContextProvider from 'store/User';
import GlobalStyles from 'styles/global';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
  @media screen and (max-width: ${props => props.theme.breakpoints.small}) {
    height: auto;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <UserContextProvider>
            <Layout>
              <Header />
              <Route path="/" exact component={Home} />
              <Route path="/logIn" exact component={LogIn} />
              <Route path="/register" exact component={Register} />
              <Route path="/todo" exact component={ToDo} />
            </Layout>
          </UserContextProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
